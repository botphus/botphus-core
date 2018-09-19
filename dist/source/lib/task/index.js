"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fse = require("fs-extra");
const path = require("path");
const common_1 = require("../../types/common");
const common_2 = require("../common");
const cache_1 = require("./cache");
const valid_1 = require("./valid");
/**
 * Create Task & return task no
 * @param  {string}          taskName  Task Name
 * @param  {number}          mtime     Task Update Time, 13 digits timestamp
 * @param  {RuleTypeItem[]}  taskRules Task Rule List
 * @param  {IBotphusConfig}  config    Botphus config
 * @return {Promise<string>}           Promise with Task Number
 */
function createTask(taskName, mtime, taskRules, config) {
    const taskNo = common_2.getTaskNoByTaskName(taskName);
    // Cache file path for rules
    const cacheFilePath = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    // Check if cache exists
    return valid_1.validTaskRules(taskRules)
        .then(() => {
        return cache_1.checkCache(cacheFilePath, taskNo, mtime);
    })
        .then((curTaskNo) => {
        if (curTaskNo) {
            return curTaskNo;
        }
        // if cache is inexistence, create it & return taskNo
        return cache_1.createCache(cacheFilePath, taskNo, taskRules)
            .then(() => {
            return taskNo;
        });
    });
}
exports.createTask = createTask;
/**
 * Remove task file
 * @param  {string}         taskNo Task No
 * @param  {IBotphusConfig} config Botphus config
 * @return {Promise<void>}         Promise with nothing
 */
function removeTask(taskNo, config) {
    // Cache file path
    const cacheFilePath = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    return fse.remove(cacheFilePath);
}
exports.removeTask = removeTask;
/**
 * Clear all task files from cache dir
 * @param  {IBotphusConfig} config Botphus config
 * @return {Promise<void>}         Promise with nothing
 */
function clearTask(config) {
    return fse.emptyDir(path.join(config.cachePath, '/task-cache/'));
}
exports.clearTask = clearTask;
/**
 * Start task
 * @param  {string}                taskNo      Task No
 * @param  {string}                startPage   Task start page
 * @param  {ITaskStartOption}      startOption Task start option
 * @param  {IBotphusConfig}        config      Botphus config
 * @return {Promise<ChildProcess>}             Promise with task child process
 */
function startTask(taskNo, startPage, startOption, config) {
    // Cache file path
    const cacheFilePath = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    return cache_1.getCache(cacheFilePath)
        .then((stats) => {
        if (!stats) {
            return Promise.reject(new common_2.ErrorMessage('Task cache is nonexistence', common_1.MessageType.TASK_RULES_CACHE_ERROR));
        }
        const subprocess = child_process_1.fork(cacheFilePath, [], {
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
exports.startTask = startTask;
