import React from 'react';

import { formatNumber, formatPercentage } from 'common/format';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
import Analyzer from 'Parser/Core/Analyzer';
import HealingDone from 'Parser/Core/Modules/HealingDone';
import AbilityTracker from 'Parser/Core/Modules/AbilityTracker';
import StatisticBox, { STATISTIC_ORDER } from 'Interface/Others/StatisticBox';
import ItemHealingDone from 'Interface/Others/ItemHealingDone';
import calculateEffectiveHealing from 'Parser/Core/calculateEffectiveHealing';

import { ABILITIES_AFFECTED_BY_HEALING_INCREASES } from '../../Constants';
import Rejuvenation from '../Core/Rejuvenation';

const ALL_BOOST = 0.15;
const ALL_MULT = 1.15;
const REJUV_BOOST = 0.50;
const REJUV_MANA_SAVED = 0.30;
const REJUV_MANA_COST = 220000 * 0.1;
const WG_INCREASE = (8 / 6) - 1;
const TOL_DURATION = 30000;
const CS_DURATION = 12000;

// have to be careful about applying stacking boosts so we don't double count. Arbitrarily considering all boost to be applied "first"
// for example, lets say a rejuv tick during ToL heals for 1000 base, but is boosted by 1.15 * 1.5 => 1725... a total of 725 raw boost
// if we count each as a seperate boost, we get 1.15 => 225 boost, 1.5 => 575, total of 800 ... the overlapping boost was double counted
// we correct for this by dividing out the all boost before calcing either the rejuv boost or the wg increase

/*
 * This module handles both the 'Incarnation: Tree of Life' talent and the 'Chameleon Song' legendary
 *
 * Incarnation: Tree of Life -
 * Shapeshift into the Tree of Life, increasing healing done by 15%, increasing armor by 120%, and granting protection from Polymorph effects.  Functionality of Rejuvenation, Wild Growth, Regrowth, and Entangling Roots is enhanced.
 *
 * Chameleon Song -
 * Equip: Wild Growth has a 15% chance to grant you Incarnation: Tree of Life for 12 sec.
 *
 * Tree of Life bonuses:
 *  - ALL: +15% healing
 *  - Rejuv: +50% healing and -30% mana
 *  - Regrowth: instant
 *  - Wild Growth: +2 targets
 */
class TreeOfLife extends Analyzer {
  static dependencies = {
    healingDone: HealingDone,
    abilityTracker: AbilityTracker,
    rejuvenation: Rejuvenation,
  };

  hasTol = false;
  lastTolCast = null;

  hasCs = false;

  lastTolApply = null;
  completedTolUptime = 0;
  completedCsUptime = 0;

  wgCasts = 0;

  hardcast = {
    allBoostHealing: 0,
    rejuvBoostHealing: 0,
    rejuvManaSaved: 0,
    extraWgHealing: 0,
  };

  chameleonSong = {
    allBoostHealing: 0,
    rejuvBoostHealing: 0,
    rejuvManaSaved: 0,
    extraWgHealing: 0,
  };

  constructor(...args) {
    super(...args);
    this.hasTol = this.selectedCombatant.hasTalent(SPELLS.INCARNATION_TREE_OF_LIFE_TALENT.id);
    this.hasCs = this.selectedCombatant.hasHead(ITEMS.CHAMELEON_SONG.id);
    this.active = this.hasTol || this.hasCs;
  }

  // gets the appropriate accumulator for tallying this event
  // if ToL buff isn't active, returns null,
  // if ToL buff is due to hardcast, returns the hardcast accumulator,
  // if ToL buff is due to CS, returns the CS accumulator.
  _getAccumulator(event) {
    if (!this.selectedCombatant.hasBuff(SPELLS.INCARNATION_TREE_OF_LIFE_TALENT.id)) {
      return null;
    } else if ((!this.hasCs) || (this.lastTolCast && this.lastTolCast + TOL_DURATION > event.timestamp)) {
      return this.hardcast;
    } else {
      return this.chameleonSong;
    }
  }

  on_byPlayer_heal(event) {
    const spellId = event.ability.guid;
    if (!ABILITIES_AFFECTED_BY_HEALING_INCREASES.includes(spellId)) {
      return;
    }

    // chooses which attribution accumulator to use based on if the ToL buff is due to a hardcast or a CS proc
    const accumulator = this._getAccumulator(event);
    if (!accumulator) {
      return;
    }

    accumulator.allBoostHealing += calculateEffectiveHealing(event, ALL_BOOST);

    if (spellId === SPELLS.REJUVENATION.id || spellId === SPELLS.REJUVENATION_GERMINATION.id) {
      accumulator.rejuvBoostHealing += (calculateEffectiveHealing(event, REJUV_BOOST) / ALL_MULT);
    } else if (spellId === SPELLS.WILD_GROWTH.id) {
      accumulator.extraWgHealing += (calculateEffectiveHealing(event, WG_INCREASE) / ALL_MULT);
    }
  }

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.INCARNATION_TREE_OF_LIFE_TALENT.id) {
      this.lastTolCast = event.timestamp;
    } else if (spellId === SPELLS.REJUVENATION.id) {
      const accumulator = this._getAccumulator(event);
      if (!accumulator) {
        return;
      }
      accumulator.rejuvManaSaved += REJUV_MANA_SAVED;
    } else if (spellId === SPELLS.WILD_GROWTH.id) {
      this.wgCasts += 1;
    }
  }

  on_byPlayer_applybuff(event) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.INCARNATION_TOL_ALLOWED.id) {
      this.lastTolApply = event.timestamp;
      if (event.prepull && this.hasTol) {
        this.lastTolCast = event.timestamp; // if player has ToL talent and buff was present on pull, assume it was from a precast
      }
    }
  }

  on_byPlayer_removebuff(event) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.INCARNATION_TOL_ALLOWED.id) {
      const buffUptime = event.timestamp - this.lastTolApply;
      // find out how much of this buff uptime was due to ToL and how much due to CS
      if (this.lastTolCast) {
        this.completedTolUptime += Math.min(TOL_DURATION, buffUptime);
        this.completedCsUptime += Math.max(buffUptime - TOL_DURATION, 0);
      } else {
        this.completedCsUptime += buffUptime;
      }

      this.lastTolCast = null;
      this.lastTolApply = null;
    }
  }

  get hardcastUptime() {
    const currentUptime = !(this.lastTolCast) ? 0 : Math.min(TOL_DURATION, this.owner.currentTimestamp - this.lastTolCast);
    return currentUptime + this.completedTolUptime;
  }
  get hardcastUptimePercent() {
    return this.hardcastUptime / this.owner.fightDuration;
  }

  get csUptime() {
    let currentUptime = 0;
    if (this.lastTolApply) {
      currentUptime = this.owner.currentTimestamp - this.lastTolApply;
      if (this.lastTolCast) {
        currentUptime -= Math.min(TOL_DURATION, this.owner.currentTimestamp - this.lastTolApply);
      }
    }
    return currentUptime + this.completedCsUptime;
  }
  get csUptimePercent() {
    return this.csUptime / this.owner.fightDuration;
  }
  get csProcs() {
    const csUptimeRoundedToSeconds = Math.round(this.csUptime / 1000) * 1000; // rounding so that a few errant ms doesn't cause the following ceil to inproperly add a proc
    return Math.ceil(csUptimeRoundedToSeconds / CS_DURATION); // ceil so that a proc cut off due to fight end or player death still counts as a proc
  }
  get estimatedCsProcRate() {
    return (this.csProcs / this.wgCasts) || 0;
  }

  _getManaSavedHealing(accumulator) {
    return accumulator.rejuvManaSaved * this.rejuvenation.avgRejuvHealing;
  }

  _getManaSaved(accumulator) {
    return accumulator.rejuvManaSaved * REJUV_MANA_COST;
  }

  _getTotalHealing(accumulator) {
    return accumulator.allBoostHealing + accumulator.rejuvBoostHealing + accumulator.extraWgHealing + this._getManaSavedHealing(accumulator);
  }

  get suggestionThresholds() {
    return {
      actual: this.owner.getPercentageOfTotalHealingDone(this._getTotalHealing(this.hardcast)),
      isLessThan: {
        minor: 0.09,
        average: 0.06,
        major: 0.03,
      },
      style: 'percentage',
    };
  }

  suggestions(when) {
    if (!this.hasTol) {
      return;
    }

    when(this.suggestionThresholds)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(<React.Fragment>Your <SpellLink id={SPELLS.INCARNATION_TREE_OF_LIFE_TALENT.id} /> is not providing you much throughput. You may want to plan your CD usage better or pick another talent.</React.Fragment>)
          .icon(SPELLS.INCARNATION_TREE_OF_LIFE_TALENT.icon)
          .actual(`${formatPercentage(actual)}% healing`)
          .recommended(`>${formatPercentage(recommended, 0)}% is recommended`);
      });
  }

  statistic() {
    if (!this.hasTol) {
      return null;
    }

    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.INCARNATION_TREE_OF_LIFE_TALENT.id} />}
        value={`${formatPercentage(this.owner.getPercentageOfTotalHealingDone(this._getTotalHealing(this.hardcast)))} %`}
        label="Tree of Life Healing"
        tooltip={`The Tree of Life buff ${this.hasCs ? '(not including from Chameleon Song procs) ' : ''}was active for <b>${(this.hardcastUptime / 1000).toFixed(0)}s</b>, or <b>${formatPercentage(this.hardcastUptimePercent, 1)}%</b> of the encounter. The displayed healing number ${this.hasCs ? 'does not include healing from Chameleon Song procs and ' : ''} is the sum of several benefits, listed below:
          <ul>
            <li>Overall Increased Healing: <b>${formatPercentage(this.owner.getPercentageOfTotalHealingDone(this.hardcast.allBoostHealing))}%</b></li>
            <li>Rejuv Increased Healing: <b>${formatPercentage(this.owner.getPercentageOfTotalHealingDone(this.hardcast.rejuvBoostHealing))}%</b></li>
            <li>Rejuv Mana Saved: <b>${formatNumber(this._getManaSaved(this.hardcast))}</b> (assuming mana used to fill with Rejuvs: <b>???${formatPercentage(this.owner.getPercentageOfTotalHealingDone(this._getManaSavedHealing(this.hardcast)))}%</b> healing)</li>
            <li>Increased Wild Growths: <b>${formatPercentage(this.owner.getPercentageOfTotalHealingDone(this.hardcast.extraWgHealing))}%</b></li>
          </ul>
        `}
      />
    );
  }
  statisticOrder = STATISTIC_ORDER.OPTIONAL();

  item() {
    if (!this.hasCs) {
      return null;
    }

    return {
      item: ITEMS.CHAMELEON_SONG,
      result: (
        <dfn data-tip={`The Tree of Life buff ${this.hasTol ? '(from procs only, not including Tree of Life casts) ' : ''}was active for <b>${(this.csUptime / 1000).toFixed(0)}s</b>, or <b>${formatPercentage(this.csUptimePercent)}%</b> of the encounter. You got <b>${this.csProcs} procs</b>, for a proc rate of <b>${formatPercentage(this.estimatedCsProcRate, 1)}%</b>. The displayed healing number ${this.hasTol ? 'includes healing from procs only, and ' : ''} is the sum of several benefits, listed below:
          <ul>
            <li>Overall Increased Healing: <b>${formatPercentage(this.owner.getPercentageOfTotalHealingDone(this.chameleonSong.allBoostHealing))}%</b></li>
            <li>Rejuv Increased Healing: <b>${formatPercentage(this.owner.getPercentageOfTotalHealingDone(this.chameleonSong.rejuvBoostHealing))}%</b></li>
            <li>Rejuv Mana Saved: <b>${formatNumber(this._getManaSaved(this.chameleonSong))}</b> (assuming mana used to fill with Rejuvs: <b>???${formatPercentage(this.owner.getPercentageOfTotalHealingDone(this._getManaSavedHealing(this.chameleonSong)))}%</b> healing)</li>
            <li>Increased Wild Growths: <b>${formatPercentage(this.owner.getPercentageOfTotalHealingDone(this.chameleonSong.extraWgHealing))}%</b></li>
          </ul>`}>
          <ItemHealingDone amount={this._getTotalHealing(this.chameleonSong)} />
        </dfn>
      ),
    };
  }

}

export default TreeOfLife;
