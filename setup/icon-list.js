const selectionJson = require('../app/assets/selection.json');
const fs = require('fs');
const path = require('path');

const nameList = selectionJson.icons.map(icon => ({
  name: icon.properties.name.split(',')[0].includes('-')
    ? icon.properties.name.split(',')[0].split('-')[0] + icon.properties.name.split(',')[0].split('-')[1].charAt(0).toUpperCase() + icon.properties.name.split(',')[0].split('-')[1].slice(1)
    : icon.properties.name.split(',')[0].replace('-', ''),
  value: icon.properties.name.split(',')[0],
}));

const ABSOLUTE_PATH = '../app/utils/icon-enums.ts';
const PATH = path.resolve(__dirname, ABSOLUTE_PATH);

fs.writeFile(
  PATH,
  `export enum ICONS {
    ${nameList.map((item, index) => `${item.name} = "${item.value}"`)}
  }`,
  err => {
    console.log(err);
  },
);
