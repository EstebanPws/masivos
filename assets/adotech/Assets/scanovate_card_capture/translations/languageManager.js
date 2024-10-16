'use strict';

module.exports = {
    getTranslationObject
};

/**
 * Gets a language object instance
 * @param {String} language a country's internet code, e.g. 'IL'
 */
function getTranslationObject(language) {
    if(language === 'en'){
        return require('./english');
    } else {
        return require('./hebrew')
    }
}