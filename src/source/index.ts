import {tmpdir} from 'os';
import {join} from 'path';

import {IBotphusConfig, Ii18nMessage, IMessage} from './interfaces/common';
import {RuleTypeItem} from './types/task';

import {getI18nPackage} from './lib/common';
import {clearTask, createTask, removeTask} from './lib/task';

/**
 * Botphus Core Task
 */
class BotphusCore {
    private config: IBotphusConfig; // Basic Config
    private i18nPackage: Ii18nMessage; // i18n
    constructor(customConfig?: IBotphusConfig) {
        // Update basic config
        this.config = {
            cachePath: join(tmpdir(), '/botphus/'),
            locale: 'default',
            ...customConfig
        };
        this.getI18nPackage();
    }
    /**
     * Create Task & return task no
     * @param  {string}          taskName  Task Name
     * @param  {number}          mtime     Task Update Time, 13 digits timestamp
     * @param  {RuleTypeItem[]}  taskRules Task Rule List
     * @return {Promise<string>}           Promise with Task Number
     */
    public createTask(taskName: string, mtime: number, taskRules: RuleTypeItem[]): Promise<string> {
        return createTask(taskName, mtime, taskRules, this.config)
            .catch((err) => this.getErrorMessage(err));
    }
    /**
     * Remove task with taskNo
     * @param  {string}        taskNo Task No
     * @return {Promise<void>}        Promise with none
     */
    public removeTask(taskNo: string): Promise<void> {
        return removeTask(taskNo, this.config);
    }
    /**
     * Remove All Task Cache file
     * @return {Promise<void>} Promise with none
     */
    public clearTask(): Promise<void> {
        return clearTask(this.config);
    }
    // todo, 开始任务,返回任务执行子进程
    public startTask(): any {
        return '';
    }
    /**
     * get i18n package by current config locale
     */
    private getI18nPackage() {
        this.i18nPackage = getI18nPackage(this.config.locale);
    }
    /**
     * Get error message with err code with promise proxy
     * @param  {IMessage}        err err info
     * @return {Promise<string>}     Promise proxy
     */
    private getErrorMessage(err: IMessage): Promise<string> {
        const curMsgType: string = err.type;
        err.message = this.i18nPackage[curMsgType];
        return Promise.reject(err);
    }
}

export default BotphusCore;
