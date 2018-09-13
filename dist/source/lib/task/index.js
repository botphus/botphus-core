"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const path = require("path");
const common_1 = require("../../types/common");
const common_2 = require("../common");
const cache_1 = require("./cache");
/**
 * Create Task & return task no
 * @param  {string}          taskName  Task Name
 * @param  {number}          mtime     Task Update Time, 13 digits timestamp
 * @param  {RuleTypeItem[]}  taskRules Task Rule List
 * @param  {IBotphusConfig}  config    Botphus config
 * @return {Promise<string>}           Promise with Task Number
 */
function createTask(taskName, mtime, taskRules, config) {
    // Check if task rule is right
    if (taskRules.length === 0) {
        return Promise.reject(new common_2.ErrorMessage('Task rules is empty', common_1.MessageType.TASK_RULES_RENDER_ERROR));
    }
    const taskNo = common_2.getTaskNoByTaskName(taskName);
    // Cache file path for rules
    const cacheFilePath = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    // Check if cache exists
    return cache_1.checkCache(cacheFilePath, taskNo, mtime)
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
 * @return {Promise<void>}         Promise with none
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
 * @return {Promise<void>}         Promise with none
 */
function clearTask(config) {
    return fse.emptyDir(path.join(config.cachePath, '/task-cache/'));
}
exports.clearTask = clearTask;
