import * as crypto from 'crypto';

import {Ii18nMessage} from '../interfaces/common';

/**
 * Create hash
 * @param  {string} str Target String
 * @return {string}     Target string hash result
 */
export function createHash(str: string): string {
    return crypto
            .createHash('md5')
            .update(str)
            .digest('hex');
}

/**
 * Get task No with task name
 * @param  {string} taskName Task Name
 * @return {string}          Task No
 */
export function getTaskNoByTaskName(taskName: string): string {
    return createHash(taskName);
}

/**
 * Get i18n language package
 * @param  {string} locale Locale name
 * @return {object}        Package info
 */
export function getI18nPackage(locale: string): Ii18nMessage {
    switch (locale) {
        case 'default': // If default return package default language
            return require('../lang/default');
        default: // or require npm package by name rule: @botphus-lang/xxx
            try {
                return require(`@botphus-lang/${locale}`);
            } catch (e) {
                throw new Error(`Find i18n package "@botphus-lang/${locale}" Error: ${e.message}`);
            }
    }
}
