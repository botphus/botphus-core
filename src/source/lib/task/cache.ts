import * as fs from 'fs';
import * as fse from 'fs-extra';
import {js} from 'js-beautify';

import {MessageType} from '../../types/common';
import {RuleTypeItem} from '../../types/task';

import {createErrorMessage} from '../common';
import {template} from '../handlebars';

import {BOTPHUS_LIB_PATH} from '../../const';

/**
 * check if cache file exist
 * @param  {string}          cacheFilePath Cache File Path
 * @param  {string}          taskNo        Task No
 * @param  {number}          mtime         Modify Time, a 13 digit Unix Timestamp
 * @return {Promise<string>}               Promise, if existed, return taskNo
 */
export function checkCache(cacheFilePath: string, taskNo: string, mtime: number): Promise<string> {
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
    .then((stats: fs.Stats) => {
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

/**
 * Create a cache file
 * @param  {string}          cacheFilePath Cache File Path
 * @param  {string}          taskNo        Task No
 * @param  {RuleTypeItem[]}  taskRules     Task Rules
 * @return {Promise<string>}               Promise, if success, return taskNo;
 */
export function createCache(cacheFilePath: string, taskNo: string, taskRules: RuleTypeItem[]): Promise<string> {
    return template()
        .then((templateFunc) => {
            return fse.outputFile(cacheFilePath, js(templateFunc({
                libPath: BOTPHUS_LIB_PATH.replace(/\\/g, '\\\\'),
                taskRules
            })));
        })
        .then(() => taskNo)
        .catch((err) => {
            return Promise.reject(createErrorMessage(err, MessageType.TASK_RULES_RENDER_ERROR));
        });
}
