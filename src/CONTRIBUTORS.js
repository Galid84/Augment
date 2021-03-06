/**
 * This contains a listing of all contributors. Entries are used in configs and changelogs.
 * Feel free to add yourself if you're not yet in the list.
 *
 * Using `require` for avatars so we don't have to keep a seperate list of imports disconnected from the maintainer definition.
 *
 EXAMPLE

 export const NICKNAME = {
    nickname: 'NICKNAME',
    github: 'GITHUB_NAME',
    discord: 'DISCORD_NAME INCL #xxxx',
    avatar: require('./images/IMAGE'),
    desc: 'DESC',
    mains: [{
      name: 'CHARNAME',
      spec: SPECS.BLOOD_DEATH_KNIGHT,
      link: 'ARMOR/WCL-LINK',
    }],
    alts: [{
      name: 'CHARNAME',
      spec: SPECS.BLOOD_DEATH_KNIGHT,
      link: 'ARMOR/WCL-LINK',
    }],
    others: {
      'Custom Item': 'normal text',
      'Custom Item': [
        'Item 1',
        'Item 2',
      ],
    },
    links: {
      'Link No1': 'https://www.google.com',
    },
  };
*/

import SPECS from 'game/SPECS';

// For testing purposes because I am too lazy to work out a solution for testing that does not involve adding regular code
export const Dummy = {
  nickname: 'Dummy',
  github: 'DummyHub',
  twitter: '@Dummy',
  avatar: require('./images/zerotorescue-avatar.png'),
};
export const Zerotorescue = {
  nickname: 'Zerotorescue',
  github: 'MartijnHols',
  twitter: 'Zerotorescue',
  discord: 'Zerotorescue#0724',
  avatar: require('./images/zerotorescue-avatar.png'),
  desc: 'WoWAnalyzer founder, Holy Paladin theorycrafter',
  mains: [{
    name: 'Zerotorescue',
    spec: SPECS.HOLY_PALADIN,
    link: 'https://worldofwarcraft.com/en-gb/character/alakir/zerotorescue',
  }],
  alts: [{
    name: 'Zerotorescue',
    spec: SPECS.BREWMASTER_MONK,
    link: 'https://worldofwarcraft.com/en-gb/character/skullcrusher/zerotorescue',
  }, {
    name: 'Zerotorescue',
    spec: SPECS.DISCIPLINE_PRIEST,
    link: 'https://worldofwarcraft.com/en-gb/character/xavius/zerotorescue',
  }, {
    name: 'Leukenaam',
    spec: SPECS.RESTORATION_SHAMAN,
    link: 'https://worldofwarcraft.com/en-gb/character/alakir/leukenaam',
  }, {
    name: 'Zerotohunt',
    spec: SPECS.MARKSMANSHIP_HUNTER,
    link: 'https://worldofwarcraft.com/en-gb/character/alakir/Zerotohunt',
  }],
};
export const blazyb = {
  nickname: 'blazyb',
  github: 'buimichael',
};
export const sref = {
  nickname: 'sref',
  github: 'kfinch',
  avatar: require('./images/sref-avatar.png'),
};
export const Iskalla = {
  nickname: 'Iskalla',
  github: 'Iskalla',
  avatar: require('./images/iskalla-avatar.png'),
};
export const enragednuke = {
  nickname: 'enragednuke',
  github: 'enragednuke',
};
export const Skamer = {
  nickname: 'Skamer',
  github: 'Skamer',
};
export const Salarissia = {
  nickname: 'Salarissia',
  github: 'Salarissia',
};
export const WOPR = {
  nickname: 'WOPR',
  github: 'shighman',
};
export const Yajinni = {
  nickname: 'Yajinni',
  github: 'yajinni',
};
export const Bonebasher = {
  nickname: 'Bonebasher',
};
export const Sharrq = {
  nickname: 'Sharrq',
  github: 'Sharrq',
  avatar: require('./images/Sharrq_avatar.jpg'),
};
export const Khazak = {
  nickname: 'Khazak',
  github: 'jjs451',
};
export const Bicepspump = {
  nickname: 'Bicepspump',
  github: 'Bicepspump',
};
export const Mamtooth = {
  nickname: 'Mamtooth',
  github: 'ronaldpereira',
  avatar: require('./images/mamtooth-avatar.png'),
};
export const Thieseract = {
  nickname: 'Thieseract',
  github: 'Thieseract',
};
export const Putro = {
  nickname: 'Putro',
  github: 'Pewtro',
  discord: 'Putro#6093',
  avatar: require('./images/putro-avatar.png'),
  mains: [
    {
      name: 'Putro',
      spec: SPECS.MARKSMANSHIP_HUNTER,
      link: 'https://worldofwarcraft.com/en-gb/character/ragnaros/putro',
    },
  ],
};
export const Blazballs = {
  nickname: 'Blazballs',
  github: 'leapis',
};
export const faide = {
  nickname: 'faide',
  github: 'FaideWW',
  avatar: require('./images/faide-avatar.png'),
};
export const Fyruna = {
  nickname: 'Fyruna',
  github: 'Fyruna',
  avatar: require('./images/Fyruna_avatar.jpg'),
};
export const Anomoly = {
  nickname: 'Anomoly',
  github: 'anom0ly',
  avatar: require('./images/anomoly-avatar.jpg'),
};
export const Juko8 = {
  nickname: 'Juko8',
  github: 'Juko8',
  avatar: require('./images/juko8-avatar.jpg'),
};
export const Noichxd = {
  nickname: 'Noichxd',
  github: 'Noichxd',
};
export const Hewhosmites = {
  nickname: 'Hewhosmites',
  github: 'CollCrom',
  avatar: require('./images/hewhosmites-avatar.png'),
};
export const Reglitch = {
  nickname: 'Reglitch',
  github: 'rp4rk',
};
export const Gao = {
  nickname: 'Gao',
  github: 'awlego',
};
export const Oratio = {
  nickname: 'Oratio',
  github: 'karlpralow',
};
export const hassebewlen = {
  nickname: 'hassebewlen',
  github: 'hasseboulen',
};
export const tsabo = {
  nickname: 'tsabo',
  github: 'TsaboTavok',
};
export const zealk = {
  nickname: 'zealk',
  github: 'zealk',
};
export const fasib = {
  nickname: 'fasib',
  github: 'fasib',
};
export const janvavra = {
  nickname: 'janvavra',
  github: 'janvavra',
};
export const Nighteyez07 = {
  nickname: 'Nighteyez07',
  github: 'Nighteyez07',
};
export const Versaya = {
  nickname: 'Versaya',
  github: 'versaya',
};
export const Chizu = {
  nickname: 'Chizu',
  github: 'sMteX',
  avatar: require('./images/Chizu_avatar.jpg'),
};
export const Hordehobbs = {
  nickname: 'Hordehobbs',
  github: 'hpabst',
};
export const TheBadBossy = {
  nickname: 'TheBadBossy',
  avatar: require('./images/thebadbossy_avatar.jpg'),
};
export const JLassie82 = {
  nickname: 'JLassie82',
  github: 'JLassie82',
};
export const aryu = {
  nickname: 'aryu',
  github: 'Yuyz0112',
};
export const Dyspho = {
  nickname: 'Dyspho',
};
export const Gurupitka = {
  nickname: 'Gurupitka',
};
export const Hartra344 = {
  nickname: 'hartra344',
  github: 'hartra344',
};
export const strel = {
  nickname: 'strel',
};
export const Maldark = {
  nickname: 'Maldark',
  github: 'Maldark',
};
export const hatra344 = {
  nickname: 'hatra344',
  github: 'hatra344',
};
export const emallson = {
  nickname: 'emallson',
  github: 'emallson',
};
export const Gebuz = {
  nickname: 'Gebuz',
  github: 'Gebuz',
  avatar: require('./images/gebuz-avatar.png'),
};
export const milesoldenburg = {
  nickname: 'milesoldenburg',
  github: 'milesoldenburg',
};
export const mwwscott0 = {
  nickname: 'mwwscott0',
  github: 'mwwscott0',
};
export const Talby = {
  nickname: 'Talby',
  github: 'Talby223',
};
export const Coryn = {
  nickname: 'Coryn',
  github: 'terndrup',
};
export const AttilioLH = {
  nickname: 'AttilioLH',
  github: 'AttilioLH',
};
export const poneria = {
  nickname: 'poneria',
  github: 'poneria',
};
export const Nekorsis = {
  nickname: 'Nekorsis',
  github: 'Nekorsis',
};
export const greatman = {
  nickname: 'greatman',
  github: 'greatman',
};
export const rubensayshi = {
  nickname: 'rubensayshi',
  github: 'rubensayshi',
};
export const nutspanther = {
  nickname: 'nutspanther',
  github: 'nutspanther',
};
export const Riglerr = {
  nickname: 'Riglerr',
  github: 'Riglerr',
};
export const BlokyKappa = {
  nickname: 'BlokyKappa',
  github: 'BlokyKappa',
};
export const kyleglick = {
  nickname: 'kyle-glick',
  github: 'kyle-glick',
};
export const Zeboot = {
  nickname: 'Zeboot',
  github: 'Zeboot',
};
export const HawkCorrigan = {
  nickname: 'HawkCorrigan',
  github: 'HawkCorrigan',
};
export const Anatta336 = {
  nickname: 'Anatta336',
  github: 'Anatta336',
  discord: 'Anatta#5878',
};
export const Herusx = {
  nickname: 'Herusx',
};
export const Scaleable = {
  nickname: 'Scaleable',
  github: 'wkrueger',
  avatar: require('./images/scaleable-avatar.png'),
};
export const Cloake = {
  nickname: 'Cloake',
  github: 'adilasif',
  discord: 'Cloake#9930',
  mains: [{
    name: 'Trixx',
    spec: SPECS.ASSASSINATION_ROGUE,
    link: 'https://worldofwarcraft.com/en-us/character/kelthuzad/Trixx',
  }],
};
export const joshinator = {
  nickname: 'joshinator',
  github: 'joshinat0r',
  discord: 'joshinator#7267',
  mains: [{
    name: '??xt??nd??d',
    spec: SPECS.BLOOD_DEATH_KNIGHT,
    link: 'https://worldofwarcraft.com/en-gb/character/eredar/??xt??nd??d',
  }],
};
export const niseko = {
  nickname: 'niseko',
  github: 'niseko',
  discord: 'niseko#4130',
  avatar: require('./images/niseko-avatar.jpg'),
  mains: [{
    name: 'Niseko',
    spec: SPECS.RESTORATION_SHAMAN,
    link: 'https://worldofwarcraft.com/en-gb/character/stormscale/niseko',
  },
    {
      name: 'Nisefy',
      spec: SPECS.MISTWEAVER_MONK,
      link: 'https://worldofwarcraft.com/en-gb/character/stormscale/nisefy',
    }],
  links: {
    'Ancestral Guidance': 'https://ancestralguidance.com/',
  },
};
export const Aelexe = {
  nickname: 'Aelexe',
  github: 'Aelexe',
  avatar: require('./images/Aelexe-avatar.jpg'),
  maintainer: [
    SPECS.ARMS_WARRIOR,
  ],
  mains: [{
    name: 'Aelexe',
    spec: SPECS.HOLY_PALADIN,
    link: 'https://worldofwarcraft.com/en-us/character/frostmourne/aelexe',
  }],
};
export const CubeLuke = {
  nickname: 'CubeLuke',
  github: 'CubeLuke',
  discord: 'CubeLuke#8595',
  avatar: require('./images/CubeLuke-avatar.jpg'),
  mains: [{
    name: 'Monachi',
    spec: SPECS.MISTWEAVER_MONK,
    link: 'https://worldofwarcraft.com/en-us/character/bleeding-hollow/monachi',
  }],
};
export const ackwell = {
  nickname: 'ackwell',
  github: 'ackwell',
  discord: 'ackwell#3835',
  avatar: require('./images/ackwell-avatar.png'),
};
export const regret = {
  nickname: 'regret',
  github: 'remyaraya',
  discord: "regret#8633",
  mains: [{
    name: 'Ratchrat',
    spec: SPECS.HOLY_PALADIN,
    link: 'https://worldofwarcraft.com/en-us/character/thrall/ratchrat',
  }],
};
