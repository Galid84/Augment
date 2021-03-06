import React from 'react';

import SPELLS from 'common/SPELLS';
import fetchWcl from 'common/fetchWclApi';
import SpellIcon from 'common/SpellIcon';
import Analyzer from 'Parser/Core/Analyzer';
import LazyLoadStatisticBox, { STATISTIC_ORDER } from 'Interface/Others/LazyLoadStatisticBox';

import DevotionAuraDamageReduction from './DevotionAuraDamageReduction';

const DEVOTION_AURA_ACTIVE_DAMAGE_REDUCTION = 0.2;
const DEVOTION_AURA_ACTIVE_HP_THRESHOLD = 1 - 1 / (1 + DEVOTION_AURA_ACTIVE_DAMAGE_REDUCTION);

/**
 * Falling damage is considered "pure" or w/e damage meaning it doesn't get reduced by damage reductions. The ability description of such an event can look like this: {
		"name": "Falling",
		"guid": 3,
		"type": 1,
		"abilityIcon": "inv_axe_02.jpg"
	},
 * `type: 1` seems to only be used by Falling, but I was unable to verify this. I want to ignore this kind of damage taken. I figured the savest solution would be to filter by ability id instead of type, but if you find another such ability that needs to be ignored and it has `type: 1` while nothing else does, we may want to refactor this.
 */
// const THIS_MIGHT_BE_PURE_ABILITY_TYPE_ID = 1;
const FALLING_DAMAGE_ABILITY_ID = 3;

class DevotionAuraLivesSaved extends Analyzer {
  static dependencies = {
    devotionAuraDamageReduction: DevotionAuraDamageReduction,
  };

  livesSaved = 0;
  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTalent(SPELLS.DEVOTION_AURA_TALENT.id);
  }

  on_toPlayer_damage(event) {
    const spellId = event.ability.guid;
    if (spellId === FALLING_DAMAGE_ABILITY_ID) {
      return;
    }

    const isAuraMasteryActive = this.selectedCombatant.hasBuff(SPELLS.AURA_MASTERY.id, event.timestamp, 0, 0, this.owner.playerId);
    if (!isAuraMasteryActive) {
      // TODO: Check for dropping below 3% health
    }
  }

  // recursively fetch events until no nextPageTimestamp is returned
  fetchAll(pathname, query) {
    const checkAndFetch = async _query => {
      const json = await fetchWcl(pathname, _query);
      this.livesSaved += json.events.length;
      if (json.nextPageTimestamp) {
        return checkAndFetch(Object.assign(query, {
          start: json.nextPageTimestamp,
        }));
      }
      this.loaded = true;
      return null;
    };
    return checkAndFetch(query);
  }

  load() {
    const uptimeFilter = this.devotionAuraDamageReduction.filter;
    const filter = `(${uptimeFilter}) AND (
      type='damage'
      AND target.disposition='friendly'
      AND resources.hitPoints>0
      AND 100*resources.hpPercent<=${Math.ceil(10000 * DEVOTION_AURA_ACTIVE_HP_THRESHOLD)}
      AND 10000*(resources.hitPoints+effectiveDamage)/resources.maxHitPoints>=${Math.floor(10000 * DEVOTION_AURA_ACTIVE_HP_THRESHOLD)}
    )`;
    console.log(filter);
    const query = {
      start: this.owner.fight.start_time,
      end: this.owner.fight.end_time,
      filter,
    };
    return this.fetchAll(`report/events/${this.owner.report.code}`, query);
  }

  statistic() {
    const tooltip = this.loaded
      ? 'The amount of players that likely would have died without the Aura Mastery effect of Devotion Aura.'
      : 'Click to analyze how many lives were saved by the Aura Mastery effect of Devotion Aura.';
    return (
      <LazyLoadStatisticBox
        position={STATISTIC_ORDER.OPTIONAL(60)}
        loader={this.load.bind(this)}
        icon={<SpellIcon id={SPELLS.DEVOTION_AURA_TALENT.id} />}
        value={`???${this.livesSaved}`}
        label="Lives saved"
        tooltip={tooltip}
      />
    );
  }
}

export default DevotionAuraLivesSaved;
