import {MessageType} from '../types/common';

/**
 * Botphus Config
 */
export interface IBotphusConfig {
    cachePath?: string; // Cache path for botphus rule file
    locale?: string; // locale name for i18n language package, see `getI18nPackage` in `lib/common`
}

/**
 * i18n package list
 */
export interface Ii18nMessage {
    [propName: string]: string;
}

/**
 * Error message type
 */
export interface IMessage {
    type: MessageType;
    message: string;
    parmas: any[];
}
