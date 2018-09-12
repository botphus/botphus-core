"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fse = require("fs-extra");
const common_1 = require("../../types/common");
const handlebars_1 = require("../handlebars");
/**
 * check if cache file exist
 * @param  {string}          cacheFilePath Cache File Path
 * @param  {string}          taskNo        Task No
 * @param  {number}          mtime         Modify Time, a 13 digit Unix Timestamp
 * @return {Promise<string>}               Promise, if existed, return taskNo
 */
function checkCache(cacheFilePath, taskNo, mtime) {
    // 1. check if cache file exist
    return new Promise((resolve) => {
        fs.stat(cacheFilePath, (err, stats) => {
            // if inexistence, continue with empty stats
            if (err) {
                return resolve();
            }
            // else continue with stats
            return resolve(stats);
        });
    })
        // 2. check file mtime
        .then((stats) => {
        // check if stats inexistence, continue with empty
        if (!stats) {
            return '';
        }
        // check file mtime is later or equal than mtime, continue with taskNo
        if (new Date(stats.mtime).getTime() >= mtime) {
            return taskNo;
        }
    });
}
exports.checkCache = checkCache;
/**
 * Create a cache file
 * @param  {string}          cacheFilePath Cache File Path
 * @param  {string}          taskNo        Task No
 * @param  {RuleTypeItem[]}  taskRules     Task Rules
 * @return {Promise<string>}               Promise, if success, return taskNo;
 */
function createCache(cacheFilePath, taskNo, taskRules) {
    return handlebars_1.template()
        .then((templateFunc) => {
        return fse.outputFile(cacheFilePath, templateFunc(taskRules));
    })
        .then(() => taskNo)
        .catch((err) => {
        const error = {
            message: '',
            parmas: [err],
            type: common_1.MessageType.TASK_RULES_RENDER_ERROR
        };
        return Promise.reject(error);
    });
}
exports.createCache = createCache;
