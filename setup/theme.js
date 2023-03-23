const fs = require('fs');
const path = require('path');

//#region SETUP SIZE
const SIZE_FILE_PATH = '../app/utils/style/size.ts';
const SIZE_PATH = path.resolve(__dirname, SIZE_FILE_PATH);

const createSizes = {};
Array.from({length: 200}).forEach((_, i) => {
  let value = i;

  createSizes['flex-' + i] = {flex: value};
  createSizes['rounded-' + i] = {borderRadius: value};
  createSizes['mx-' + i] = {marginHorizontal: `_widthPixel(${value})_`};
  createSizes['px-' + i] = {paddingHorizontal: `_widthPixel(${value})_`};
  createSizes['py-' + i] = {paddingVertical: `_heightPixel(${value})_`};
  createSizes['mr-' + i] = {marginRight: `_widthPixel(${value})_`};
  createSizes['ml-' + i] = {marginLeft: `_widthPixel(${value})_`};
  createSizes['mt-' + i] = {marginTop: `_heightPixel(${value})_`};
  createSizes['mb-' + i] = {marginBottom: `_heightPixel(${value})_`};
  createSizes['pr-' + i] = {paddingRight: `_widthPixel(${value})_`};
  createSizes['pl-' + i] = {paddingLeft: `_widthPixel(${value})_`};
  createSizes['pt-' + i] = {paddingTop: `_heightPixel(${value})_`};
  createSizes['pb-' + i] = {paddingBottom: `_heightPixel(${value})_`};
  createSizes['p-' + i] = {padding: `_widthPixel(${value})_`};
  createSizes['m-' + i] = {margin: `_widthPixel(${value})_`};
  createSizes['h-' + i] = {height: `_heightPixel(${value})_`};
  createSizes['w-' + i] = {width: `_widthPixel(${value})_`};
  createSizes['col-' + i] = {width: (100 / 12) * i + '%'};
  createSizes['fs-' + i] = {fontSize: `_fontPixel(${value})_`};
  createSizes['right-' + i] = {right: `_widthPixel(${value})_`};
  createSizes['left-' + i] = {left: `_widthPixel(${value})_`};
  createSizes['top-' + i] = {top: `_heightPixel(${value})_`};
  createSizes['bottom-' + i] = {bottom: `_heightPixel(${value})_`};
  createSizes['col-' + i] = {width: (100 / 12) * i + '%'};
});

if (createSizes) {
  const writeContent = `
    import {fontPixel,heightPixel,widthPixel} from "../size-helper"
    export const setupSizes = ${JSON.stringify(createSizes)}`;

  const temp = writeContent.replace(/"_/g, '').replace(/_"/g, '');
  fs.writeFile(SIZE_PATH, temp, err => {
    if (err) {
      console.log('error: ', err);
    }
  });
}
//#endregion
