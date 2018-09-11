"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
/**
 * Create hash
 * @param  {string} str Target String
 * @return {string}     Target string hash result
 */
function createHash(str) {
    return crypto
        .createHash('md5')
        .update(str)
        .digest('hex');
}
exports.createHash = createHash;
/**
 * Get task No with task name
 * @param  {string} taskName Task Name
 * @return {string}          Task No
 */
function getTaskNoByTaskName(taskName) {
    return createHash(taskName);
}
exports.getTaskNoByTaskName = getTaskNoByTaskName;
/**
 * Get i18n language package
 * @param  {string} locale Locale name
 * @return {object}        Package info
 */
function getI18nPackage(locale) {
    switch (locale) {
        case 'default': // If default return package default language
            return require('../lang/default');
        default: // or require npm package by name rule: @botphus-lang/xxx
            try {
                return require(`@botphus-lang/${locale}`);
            }
            catch (e) {
                throw new Error(`Find i18n package "@botphus-lang/${locale}" Error: ${e.message}`);
            }
    }
}
exports.getI18nPackage = getI18nPackage;
