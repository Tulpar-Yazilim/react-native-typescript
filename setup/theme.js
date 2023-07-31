const fs = require('fs');
const path = require('path');

//#region SETUP SIZE
const SIZE_FILE_PATH = '../app/utils/style/size.ts';
const SIZE_PATH = path.resolve(__dirname, SIZE_FILE_PATH);

const createSizes = {};
const createSizeTypes = {};

Array.from({length: 200}).forEach((_, i) => {
  let value = i;

  if (value <= 9) {
    createSizes['flex-' + i] = {flex: value};
    createSizeTypes['flex-' + i] = `_boolean_`;
  }

  if (value <= 12) {
    createSizes['col-' + i] = {width: (100 / 12) * value + '%'};
    createSizeTypes['col-' + i] = `_boolean_`;
  }

  if (value <= 50) {
    createSizes['fs-' + i] = {fontSize: `_fontPixel(${value})_`};
    createSizeTypes['fs-' + i] = `_boolean_`;

    createSizes['gap-' + i] = {gap: value};
    createSizeTypes['gap-' + i] = `_boolean_`;
  }

  createSizes['rounded-' + i] = {borderRadius: value};
  createSizeTypes['rounded-' + i] = `_boolean_`;

  createSizes['rounded-left-' + i] = {borderTopLeftRadius: value, borderBottomLeftRadius: value};
  createSizeTypes['rounded-left-' + i] = `_boolean_`;

  createSizes['rounded-right-' + i] = {borderTopRightRadius: value, borderBottomRightRadius: value};
  createSizeTypes['rounded-right-' + i] = `_boolean_`;

  createSizes['mx-' + i] = {marginHorizontal: `_widthPixel(${value})_`};
  createSizeTypes['mx-' + i] = `_boolean_`;

  createSizes['px-' + i] = {paddingHorizontal: `_widthPixel(${value})_`};
  createSizeTypes['px-' + i] = `_boolean_`;

  createSizes['py-' + i] = {paddingVertical: `_heightPixel(${value})_`};
  createSizeTypes['py-' + i] = `_boolean_`;

  createSizes['mr-' + i] = {marginRight: `_widthPixel(${value})_`};
  createSizeTypes['mr-' + i] = `_boolean_`;

  createSizes['ml-' + i] = {marginLeft: `_widthPixel(${value})_`};
  createSizeTypes['ml-' + i] = `_boolean_`;

  createSizes['mt-' + i] = {marginTop: `_heightPixel(${value})_`};
  createSizeTypes['mt-' + i] = `_boolean_`;

  createSizes['mb-' + i] = {marginBottom: `_heightPixel(${value})_`};
  createSizeTypes['mb-' + i] = `_boolean_`;

  createSizes['pr-' + i] = {paddingRight: `_widthPixel(${value})_`};
  createSizeTypes['pr-' + i] = `_boolean_`;

  createSizes['pl-' + i] = {paddingLeft: `_widthPixel(${value})_`};
  createSizeTypes['pl-' + i] = `_boolean_`;

  createSizes['pt-' + i] = {paddingTop: `_heightPixel(${value})_`};
  createSizeTypes['pt-' + i] = `_boolean_`;

  createSizes['pb-' + i] = {paddingBottom: `_heightPixel(${value})_`};
  createSizeTypes['pb-' + i] = `_boolean_`;

  createSizes['p-' + i] = {padding: `_widthPixel(${value})_`};
  createSizeTypes['p-' + i] = `_boolean_`;

  createSizes['m-' + i] = {margin: `_widthPixel(${value})_`};
  createSizeTypes['m-' + i] = `_boolean_`;

  createSizes['h-' + i] = {height: `_heightPixel(${value})_`};
  createSizeTypes['h-' + i] = `_boolean_`;

  createSizes['w-' + i] = {width: `_widthPixel(${value})_`};
  createSizeTypes['w-' + i] = `_boolean_`;

  createSizes['right-' + i] = {right: `_widthPixel(${value})_`};
  createSizeTypes['right-' + i] = `_boolean_`;

  createSizes['left-' + i] = {left: `_widthPixel(${value})_`};
  createSizeTypes['left-' + i] = `_boolean_`;

  createSizes['top-' + i] = {top: `_heightPixel(${value})_`};
  createSizeTypes['top-' + i] = `_boolean_`;

  createSizes['bottom-' + i] = {bottom: `_heightPixel(${value})_`};
  createSizeTypes['bottom-' + i] = `_boolean_`;
});

if (createSizes) {
  const writeContent = `
    import {fontPixel,heightPixel,widthPixel} from "../size-helper"
    export const setupSizes = ${JSON.stringify(createSizes)}
    export type setupSizeTypes = ${JSON.stringify(createSizeTypes)}`;
  const temp = writeContent.replace(/"_/g, '').replace(/_"/g, '').replace(/:/g, '?:');
  fs.writeFile(SIZE_PATH, temp, err => {
    if (err) {
      console.log('error: ', err);
    }
  });
}
//#endregion
