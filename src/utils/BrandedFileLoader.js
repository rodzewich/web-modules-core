'use strict';

/*
 a branded folder's structure should look like, put the rebranded file with or without locale name in branded folders with a same name
 --folderName
 |--default
 |
 |--1210
 |
 |--3610
 |
 |--7310
 |
 |--7710
 * */
import { getConfig } from './functions';

export default class BrandedFileLoader {

    constructor(requireCtx) {
        this.require = requireCtx;
        this.brandId = getConfig().brandId;
        this.locale = getConfig().userLanguage;
        this.defaultLocale = 'en_US';
    }

    getFile(filePath) {
        return this.getFileInfo(filePath).file;
    }

    getFileInfo(filePath) {
        var requirePath = this.getRequirePath(filePath);
        return {
            file: this.require(requirePath),
            requirePath
        }
    }

    getRequirePath(filePath) {
        var fileArr = filePath.split('/');
        var fileName = fileArr.pop();
        var extReg = /(.+)(\.\S+$)/;
        var i18nFileFileName = fileName.replace(extReg, `$1-${this.locale}$2`);
        var i18nFilePath = [].concat(fileArr).concat([i18nFileFileName]).join('/');

        var enUSFileName = fileName.replace(extReg, `$1-${this.defaultLocale}$2`);
        var enUSFilePath = [].concat(fileArr).concat([enUSFileName]).join('/');

        var brandedI18nFilePath = `./${this.brandId}/${i18nFilePath}`;
        var brandedEnUSFilePath = `./${this.brandId}/${enUSFilePath}`;
        var defaultEnUsFilePath = `./default/${enUSFilePath}`;
        var brandedFilePath = `./${this.brandId}/${filePath}`;
        var defaultI18nFilePath = `./default/${i18nFilePath}`;
        var defaultFilePath = `./default/${filePath}`;

        var fileList = this.require.keys();

        var hasFile = file => fileList.indexOf(file) >= 0;

        // require file path like : ~otherPath/7310/logo-fr_CA.png
        if (hasFile(brandedI18nFilePath)) {
            return brandedI18nFilePath;
        }

        // require file path like : ~otherPath/7310/logo-en_US.png
        if (hasFile(brandedEnUSFilePath)) {
            return brandedEnUSFilePath;
        }

        // require file path like : ~otherPath/7310/logo.png
        if (hasFile(defaultI18nFilePath)) {
            return defaultI18nFilePath;
        }

        // require file path like : ~otherPath/default/logo-en_US.png
        if (hasFile(defaultEnUsFilePath)) {
            return defaultEnUsFilePath;
        }

        // require file path like : ~otherPath/7310/logo.png
        if (hasFile(brandedFilePath)) {
            return brandedFilePath;
        }

        // require file path like : ~otherPath/1210/logo.png
        return defaultFilePath;
    }
}
