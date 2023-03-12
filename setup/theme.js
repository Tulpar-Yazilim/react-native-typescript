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
    createSizes['mx-' + i] = {marginHorizontal: value};
    createSizes['px-' + i] = {paddingHorizontal: value};
    createSizes['py-' + i] = {paddingVertical: value};
    createSizes['mr-' + i] = {marginRight: value};
    createSizes['ml-' + i] = {marginLeft: value};
    createSizes['mt-' + i] = {marginTop: value};
    createSizes['mb-' + i] = {marginBottom: value};
    createSizes['pr-' + i] = {paddingRight: value};
    createSizes['pl-' + i] = {paddingLeft: value};
    createSizes['pt-' + i] = {paddingTop: value};
    createSizes['pb-' + i] = {paddingBottom: value};
    createSizes['p-' + i] = {padding: value};
    createSizes['m-' + i] = {margin: value};
    createSizes['h-' + i] = {height: `_heightPixel(${value})_`};
    createSizes['w-' + i] = {width: `_widthPixel(${value})_`};
    createSizes['col-' + i] = {width: (100 / 12) * i + '%'};
    createSizes['fs-' + i] = {fontSize: `_fontPixel(${value})_`};
    createSizes['right-' + i] = {right: value};
    createSizes['left-' + i] = {left: value};
    createSizes['top-' + i] = {top: value};
    createSizes['bottom-' + i] = {bottom: value};
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
