import {MessageType} from '../types/common';

/**
 * Botphus Config
 */
export interface IBotphusConfig {
    cachePath?: string; // Cache path for botphus rule file
}

/**
 * Error message type
 */
export interface IErrorMessage extends Error {
    type?: MessageType;
}
