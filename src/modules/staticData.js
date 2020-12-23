const classes = {
    1: 'Warrior',
    2: 'Paladin',
    3: 'Hunter',
    4: 'Rogue',
    5: 'Priest',
    6: 'Death Knight',
    7: 'Shaman',
    8: 'Mage',
    9: 'Warlock',
    10: 'Monk',
    11: 'Druid',
    12: 'Demon Hunter'
}

const getClass = (classId) => {
    return classes[classId]
}

const races = {
    1: 'Human',
    2: 'Orc',
    3: 'Dwarf',
    4: 'Night Elf',
    5: 'Undead',
    6: 'Tauren',
    7: 'Gnome',
    8: 'Troll',
    9: 'Goblin',
    10: 'Blood Elf',
    11: 'Draenei',
    22: 'Worgen',
    24: 'Pandaren',
    25: 'Pandaren',
    26: 'Pandaren',
    27: 'Nighborne',
    28: 'Highmountain Tauren',
    29: 'Void Elf',
    30: 'Lightforged Draenei'
}

const getRace = (raceId) => {
    return races[raceId]
}

const  colors = {
    1: '#C79C6E',
    2: '#F58CBA',
    3: '#ABD473',
    4: '#FFF569',
    5: '#FFFFFF',
    6: '#C41F3B',
    7: '#0070DE',
    8: '#69CCF0',
    9: '#9482C9',
    10: '#00FF96',
    11: '#FF7D0A',
    12: '#A330C9'
}

const getClassColor = (classId) => {
    return colors[classId]
}

const qualities = {
    'poor': 0,
    'common': 1,
    'uncommon': 2,
    'rare': 3,
    'epic': 4,
    'legendary': 5,
    'artifact': 6,
}

const itemQualityToId = (itemQuality) => {
    return qualities[itemQuality.toLowerCase()]
}

const hexes = {
    'poor': '#9d9d9d',
    'common': '#ffffff',
    'uncommon': '#1eff00',
    'rare': '#0070dd',
    'epic': '#a335ee',
    'legendary': '#ff8000',
    'artifact': '#e6cc80'
}

const getItemQualityColorHex = (itemQuality) => {
    return hexes[itemQuality.toLowerCase()]
}


const levelForRow = {
    0: 15,
    1: 25,
    2: 30,
    3: 35,
    4: 40,
    5: 45,
    6: 50
}

const getTalentRowLevel = (talentRow) => {
    return levelForRow[talentRow]
}

export {
    getClassColor,
    getClass,
    getRace,
    itemQualityToId,
    getItemQualityColorHex,
    getTalentRowLevel
}
