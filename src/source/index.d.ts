/// <reference types="node" />
import { ChildProcess } from 'child_process';
import { IBotphusConfig } from './interfaces/common';
import { ITaskStartOption } from './interfaces/task';
import { TaskRuleTypeItem } from './types/task';
/**
 * Botphus Core Task
 */
declare class BotphusCore {
    private config;
    constructor(customConfig?: IBotphusConfig);
    /**
     * Create Task & return task no
     * @param  {string}          taskName  Task Name
     * @param  {number}          mtime     Task Update Time, 13 digits timestamp
     * @param  {TaskRuleTypeItem[]}  taskRules Task Rule List
     * @return {Promise<string>}           Promise with Task Number
     */
    public createTask(taskName: string, mtime: number, taskRules: TaskRuleTypeItem[]): Promise<string>;
    /**
     * Remove task with taskNo
     * @param  {string}        taskNo Task No
     * @return {Promise<void>}        Promise with none
     */
    public removeTask(taskNo: string): Promise<void>;
    /**
     * Remove All Task Cache file
     * @return {Promise<void>} Promise with none
     */
    public clearTask(): Promise<void>;
    /**
     * Start task
     * @param  {string}                taskNo      Task No
     * @param  {string}                startPage   Task start page
     * @param  {ITaskStartOption={}}   startOption Task start option
     * @return {Promise<ChildProcess>}             Promise with task child process
     */
    public startTask(taskNo: string, startPage: string, startOption?: ITaskStartOption): Promise<ChildProcess>;
}

export default BotphusCore;

export * from './types/common';
export * from './types/task';
export * from './interfaces/common';
export * from './interfaces/task';
