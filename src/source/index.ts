import {ChildProcess} from 'child_process';
import {tmpdir} from 'os';
import {join} from 'path';

import {IBotphusConfig} from './interfaces/common';
import {ITaskStartOption} from './interfaces/task';
import {RuleTypeItem} from './types/task';

import {clearTask, createTask, removeTask, startTask} from './lib/task';

/**
 * Botphus Core Task
 */
class BotphusCore {
    private config: IBotphusConfig; // Basic Config
    constructor(customConfig?: IBotphusConfig) {
        // Update basic config
        this.config = {
            cachePath: join(tmpdir(), '/botphus/'),
            ...customConfig
        };
    }
    /**
     * Create Task & return task no
     * @param  {string}          taskName  Task Name
     * @param  {number}          mtime     Task Update Time, 13 digits timestamp
     * @param  {RuleTypeItem[]}  taskRules Task Rule List
     * @return {Promise<string>}           Promise with Task Number
     */
    public createTask(taskName: string, mtime: number, taskRules: RuleTypeItem[]): Promise<string> {
        return createTask(taskName, mtime, taskRules, this.config);
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
    /**
     * Start task
     * @param  {string}                taskNo      Task No
     * @param  {string}                startPage   Task start page
     * @param  {ITaskStartOption={}}   startOption Task start option
     * @return {Promise<ChildProcess>}             Promise with task child process
     */
    public startTask(taskNo: string, startPage: string, startOption: ITaskStartOption = {}): Promise<ChildProcess> {
        return startTask(taskNo, startPage, startOption, this.config);
    }
}

export default BotphusCore;
