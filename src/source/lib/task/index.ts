import {ChildProcess, fork} from 'child_process';
import * as fse from 'fs-extra';
import * as path from 'path';

import {IBotphusConfig} from '../../interfaces/common';
import {ITaskStartOption} from '../../interfaces/task';
import {MessageType} from '../../types/common';
import {TaskRuleTypeItem} from '../../types/task';

import {ErrorMessage, getTaskNoByTaskName} from '../common';
import {checkCache, createCache, getCache} from './cache';
import {validTaskRules} from './valid';

/**
 * Create Task & return task no
 * @param  {string}          taskName  Task Name
 * @param  {number}          mtime     Task Update Time, 13 digits timestamp
 * @param  {TaskRuleTypeItem[]}  taskRules Task Rule List
 * @param  {IBotphusConfig}  config    Botphus config
 * @return {Promise<string>}           Promise with Task Number
 */
export function createTask(taskName: string, mtime: number, taskRules: TaskRuleTypeItem[], config: IBotphusConfig): Promise<string> {
    const taskNo: string = getTaskNoByTaskName(taskName);
    // Cache file path for rules
    const cacheFilePath: string = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    // Check if cache exists
    return validTaskRules(taskRules)
        .then(() => {
            return checkCache(cacheFilePath, taskNo, mtime);
        })
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
 * @return {Promise<void>}         Promise with nothing
 */
export function removeTask(taskNo: string, config: IBotphusConfig): Promise<void> {
    // Cache file path
    const cacheFilePath: string = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    return fse.remove(cacheFilePath);
}

/**
 * Clear all task files from cache dir
 * @param  {IBotphusConfig} config Botphus config
 * @return {Promise<void>}         Promise with nothing
 */
export function clearTask(config: IBotphusConfig): Promise<void> {
    return fse.emptyDir(path.join(config.cachePath, '/task-cache/'));
}

/**
 * Start task
 * @param  {string}                taskNo      Task No
 * @param  {string}                startPage   Task start page
 * @param  {ITaskStartOption}      startOption Task start option
 * @param  {IBotphusConfig}        config      Botphus config
 * @return {Promise<ChildProcess>}             Promise with task child process
 */
export function startTask(taskNo: string, startPage: string, startOption: ITaskStartOption, config: IBotphusConfig): Promise<ChildProcess> {
    // Cache file path
    const cacheFilePath: string = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    return getCache(cacheFilePath)
        .then((stats) => {
            if (!stats) {
                return Promise.reject(new ErrorMessage('Task cache is nonexistence', MessageType.TASK_RULES_CACHE_ERROR));
            }
            const subprocess = fork(cacheFilePath, [], {
                env: {
                    EXCLUDE_OPTION: startOption.excludeOption ? JSON.stringify(startOption.excludeOption) : '',
                    MYSQL_OPTION: startOption.mysqlOption ? JSON.stringify(startOption.mysqlOption) : '',
                    PUPPETEER_LAUNCH_OPTION: startOption.puppeteerLaunchOption ? JSON.stringify(startOption.puppeteerLaunchOption) : '',
                    REDIS_OPTION: startOption.redisOption ? JSON.stringify(startOption.redisOption) : '',
                    START_PAGE: startPage
                }
            });
            return Promise.resolve(subprocess);
        });
}
