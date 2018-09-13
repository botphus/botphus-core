import {MessageType} from '../types/common';

/**
 * Botphus Config
 */
export interface IBotphusConfig {
    cachePath?: string; // Cache path for botphus rule file
    locale?: string; // locale name for i18n language package, see `getI18nPackage` in `lib/common`
}

/**
 * Error message type
 */
export interface IErrorMessage extends Error {
    type: MessageType;
}
