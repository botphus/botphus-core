"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const path_1 = require("path");
const common_1 = require("./lib/common");
const task_1 = require("./lib/task");
/**
 * Botphus Core Task
 */
class BotphusCore {
    constructor(customConfig) {
        // Update basic config
        this.config = Object.assign({ cachePath: path_1.join(os_1.tmpdir(), '/botphus/'), locale: 'default' }, customConfig);
        this.getI18nPackage();
    }
    /**
     * Create Task & return task no
     * @param  {string}          taskName  Task Name
     * @param  {number}          mtime     Task Update Time, 13 digits timestamp
     * @param  {RuleTypeItem[]}  taskRules Task Rule List
     * @return {Promise<string>}           Promise with Task Number
     */
    createTask(taskName, mtime, taskRules) {
        return task_1.createTask(taskName, mtime, taskRules, this.config)
            .catch((err) => this.getErrorMessage(err));
    }
    /**
     * Remove task with taskNo
     * @param  {string}        taskNo Task No
     * @return {Promise<void>}        Promise with none
     */
    removeTask(taskNo) {
        return task_1.removeTask(taskNo, this.config);
    }
    /**
     * Remove All Task Cache file
     * @return {Promise<void>} Promise with none
     */
    clearTask() {
        return task_1.clearTask(this.config);
    }
    // todo, 开始任务,返回任务执行子进程
    startTask() {
        return '';
    }
    /**
     * get i18n package by current config locale
     */
    getI18nPackage() {
        this.i18nPackage = common_1.getI18nPackage(this.config.locale);
    }
    /**
     * Get error message with err code with promise proxy
     * @param  {IMessage}        err err info
     * @return {Promise<string>}     Promise proxy
     */
    getErrorMessage(err) {
        const curMsgType = err.type;
        err.message = this.i18nPackage[curMsgType];
        return Promise.reject(err);
    }
}
exports.default = BotphusCore;
