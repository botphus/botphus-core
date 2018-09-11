import * as fse from 'fs-extra';
import * as path from 'path';

import {IBotphusConfig, IMessage} from '../../interfaces/common';
import {MessageType} from '../../types/common';
import {RuleTypeItem} from '../../types/task';

import {getTaskNoByTaskName} from '../common';
import {checkCache, createCache} from './cache';

/**
 * Create Task & return task no
 * @param  {string}          taskName  Task Name
 * @param  {number}          mtime     Task Update Time, 13 digits timestamp
 * @param  {RuleTypeItem[]}  taskRules Task Rule List
 * @param  {IBotphusConfig}  config    Botphus config
 * @return {Promise<string>}           Promise with Task Number
 */
export function createTask(taskName: string, mtime: number, taskRules: RuleTypeItem[], config: IBotphusConfig): Promise<string> {
    // Check if task rule is right
    if (taskRules.length === 0) {
        const error: IMessage = {
            message: '',
            parmas: [],
            type: MessageType.TASK_RULES_EMPTY
        };
        return Promise.reject(error);
    }
    const taskNo: string = getTaskNoByTaskName(taskName);
    // Cache file path for rules
    const cacheFilePath: string = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    // Check if cache exists
    return checkCache(cacheFilePath, taskNo, mtime)
        .then((curTaskNo) => {
            if (curTaskNo) {
                return curTaskNo;
            }
            // if cache is inexistence, create it & return taskNo
            return createCache(cacheFilePath, taskNo, taskRules)
                .then(() => {
                    return taskNo;
                });
        });
}

/**
 * Remove task file
 * @param  {string}         taskNo Task No
 * @param  {IBotphusConfig} config Botphus config
 * @return {Promise<void>}         Promise with none
 */
export function removeTask(taskNo: string, config: IBotphusConfig): Promise<void> {
    // Cache file path
    const cacheFilePath: string = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    return fse.remove(cacheFilePath);
}

/**
 * Clear all task files from cache dir
 * @param  {IBotphusConfig} config Botphus config
 * @return {Promise<void>}         Promise with none
 */
export function clearTask(config: IBotphusConfig): Promise<void> {
    return fse.emptyDir(path.join(config.cachePath, '/task-cache/'));
}
