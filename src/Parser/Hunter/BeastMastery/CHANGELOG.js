import React from 'react';

import { Putro } from 'CONTRIBUTORS';
import SpellLink from 'common/SpellLink';
import SPELLS from 'common/SPELLS';
import ItemLink from 'common/ItemLink';
import ITEMS from 'common/ITEMS';
import ResourceIcon from 'common/ResourceIcon';
import RESOURCE_TYPES from 'game/RESOURCE_TYPES';

export default [
  {
    date: new Date('2018-08-06'),
    changes: <React.Fragment> Adds buff indicators to relevant spells in the timeline, adjusted placement of statistic boxes, added example logs to everything BFA related and added statistics for <SpellLink id={SPELLS.CHIMAERA_SHOT_TALENT.id} />, <SpellLink id={SPELLS.DIRE_BEAST_TALENT.id} />, <SpellLink id={SPELLS.KILLER_COBRA_TALENT.id} />, <SpellLink id={SPELLS.STAMPEDE_TALENT.id} /> and <SpellLink id={SPELLS.STOMP_TALENT.id} />. </React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-07-26'),
    changes: <React.Fragment>Updated the BM module to 8.0.1, and added a <SpellLink id={SPELLS.BARBED_SHOT.id} /> statistic and acoompanying suggestions, also updated downtime module to be accurate with Aspect of the Wilds reduced GCD. </React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-04-22'),
    changes: <React.Fragment>Added a <ResourceIcon id={RESOURCE_TYPES.FOCUS.id} /> focus capping module to the checklist.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-04-10'),
    changes: <React.Fragment>Adds an additional statistic module for <ItemLink id={ITEMS.PARSELS_TONGUE.id} /> to better showcase the uptime of 4 stacks, and also updates the average refresh of Dire Frenzy to be more accurate.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-04-05'),
    changes: <React.Fragment>Updated <ItemLink id={ITEMS.PARSELS_TONGUE.id} icon /> and Dire Frenzy to include average time between refreshing, and some other minor wording changes. </React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-03-09'),
    changes: <React.Fragment>Implemented the GCD reduction from <SpellLink id={SPELLS.ASPECT_OF_THE_WILD.id} />, added legendaries to the checklist, fixed various bugs around the modules in general. Finally updated status to great to properly reflect the state of the analyzer.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-02-20'),
    changes: 'Spring cleaning in many modules. Added icons to Focus Usage modules and elsewhere around the analyzer',
    contributors: [Putro],
  },
  {
    date: new Date('2018-02-05'),
    changes: <React.Fragment>Added additional information to the <ItemLink id={ITEMS.CALL_OF_THE_WILD.id} /> module, to show cooldown reduction on the various affected spells. </React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-01-30'),
    changes: 'Added a tooltip on the focus usage chart that shows focus used aswell as amount of casts of the the given ability',
    contributors: [Putro],
  },
  {
    date: new Date('2018-01-08'),
    changes: <React.Fragment>Adjusted what deems a bad cast of <SpellLink id={SPELLS.ASPECT_OF_THE_WILD.id} /> to allow casting 3 seconds before <SpellLink id={SPELLS.BESTIAL_WRATH.id} /> comes off cooldown, or while it's ready to cast. Also adjusts how Dire Frenzy uptime and 3stack uptime is calculated</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2018-01-07'),
    changes: <React.Fragment>Adjusted how cast efficiency for <SpellLink id={SPELLS.KILL_COMMAND.id} /> was calculated when using <SpellLink id={SPELLS.KILLER_COBRA_TALENT.id} /> to show realistic amount of possible casts.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2017-12-30'),
    changes: 'Added a time focus capped module, aswell as a focus chart tab',
    contributors: [Putro],
  },
  {
    date: new Date('2017-12-26'),
    changes: 'Added a focus usage chart',
    contributors: [Putro],
  },
  {
    date: new Date('2017-12-26'),
    changes: <React.Fragment>Added support for Dire Stable, <ItemLink id={ITEMS.ROAR_OF_THE_SEVEN_LIONS.id} />, <ItemLink id={ITEMS.PARSELS_TONGUE.id} />, <ItemLink id={ITEMS.THE_MANTLE_OF_COMMAND.id} />, <ItemLink id={ITEMS.ROOTS_OF_SHALADRASSIL.id} />, <ItemLink id={ITEMS.CALL_OF_THE_WILD.id} />, <ItemLink id={ITEMS.THE_APEX_PREDATORS_CLAW.id} /> and <ItemLink id={ITEMS.THE_SHADOW_HUNTERS_VOODOO_MASK.id} />.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2017-12-24'),
    changes: 'Updated to the new checklist format, and updated AlwaysBeCasting thresholds',
    contributors: [Putro],
  },
  {
    date: new Date('2017-12-22'),
    changes: <React.Fragment>Added support for Dire Frenzyand <SpellLink id={SPELLS.ASPECT_OF_THE_WILD.id} /> and gave them suggestions. </React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2017-12-04'),
    changes: 'Added  talents and traits. Moved them into a singular box to improve visibility.',
    contributors: [Putro],
  },
  {
    date: new Date('2017-12-03'),
    changes: <React.Fragment>Upgraded spec completeness to good, added <SpellLink id={SPELLS.HUNTER_BM_T19_2P_BONUS.id} /> support, added <SpellLink id={SPELLS.HUNTER_BM_T21_2P_BONUS.id} /> and <SpellLink id={SPELLS.HUNTER_BM_T21_4P_BONUS.id} /> support and added a suggestion for <SpellLink id={SPELLS.KILLER_COBRA_TALENT.id} />.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2017-11-01'),
    changes: <React.Fragment>Added <SpellLink id={SPELLS.BESTIAL_WRATH.id} /> modules, Dire Beast modules, <ItemLink id={ITEMS.QAPLA_EREDUN_WAR_ORDER.id} /> module, <SpellLink id={SPELLS.TITANS_THUNDER.id} /> module, <SpellLink id={SPELLS.KILLER_COBRA_TALENT.id} /> module.</React.Fragment>,
    contributors: [Putro],
  },
  {
    date: new Date('2017-10-29'),
    changes: 'Added base files for Beast Mastery.',
    contributors: [Putro],
  },
];
