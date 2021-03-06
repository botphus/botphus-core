import {ClusterOptions, RedisOptions} from 'ioredis';
import {ConnectionConfig} from 'mysql';
import {LaunchOptions, NavigationOptions} from 'puppeteer';

import {MessageType} from '../types/common';
import {TaskRuleTypeItem, TaskType,
    TaskTypeDataSubType, TaskTypeDomSubType, TaskTypeEventSubType, TaskTypePageSubType, TaskTypeTimeSubType, TaskTypeUnionSubType
} from '../types/task';
import {IErrorMessage} from './common';

/**
 * Task exclude unit map
 */
export interface ITaskExcludeUnit {
    [index: string]: boolean;
}

/**
 * Task start otpion
 */
export interface ITaskStartOption {
    puppeteerLaunchOption?: LaunchOptions; // Puppeteer Launch Option, details: https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-puppeteerlaunchoptions
    mysqlOption?: ConnectionConfig; // mysql.createConnection option, details: https://github.com/mysqljs/mysql#introduction
    redisOption?: RedisOptions | ClusterOptions; // ioredis option, details:
    // https://github.com/luin/ioredis/blob/master/API.md#new_Redis_new AND https://github.com/luin/ioredis/blob/master/API.md#new_Cluster_new
    excludeOption?: ITaskExcludeUnit;
    startPageOption?: NavigationOptions; // Puppeteer start page option, details: https://pptr.dev/#?product=Puppeteer&version=v1.8.0&show=api-pagegotourl-options
}

/**
 * Task message
 */
interface ITaskMessage extends ITaskStartOption {
    index: string;
    type: MessageType;
    sendTime: number;
}
/**
 * Task error messsage
 */
export interface ITaskErrorMessage extends IErrorMessage {
    index?: string;
}
/**
 * Task start message
 */
export interface ITaskStartMessage extends ITaskMessage, ITaskStartOption {
    type: MessageType.TASK_START;
    index: 'start';
}
/**
 * Task end message
 */
export interface ITaskEndMessage extends ITaskMessage {
    type: MessageType.TASK_END;
    totalCase: number;
    index: 'end';
}
/**
 * Task unit start message
 */
export interface ITaskUnitMessage extends ITaskMessage {
    type: MessageType.TASK_UNIT_EXEC_START | MessageType.TASK_UNIT_EXEC_END;
    order: number;
}
/**
 * Task unit receive data messsage
 */
export interface ItaskUnitReceiveDataMessage extends ITaskMessage {
    type: MessageType.TASK_UNIT_EXEC_DATA_RECEIVE;
    order: number;
    data: any;
}

/**
 * Basic rule
 */
interface ITaskRuleItem {
    index?: string; // Index number, auto create
    type: TaskType; // Type
    arguments?: any[]; // Rule arguments
    assertion?: string[]; // Assertion list
    assertionVarName?: string; // Assertion variable name
    // children: TaskRuleTypeItem[] for some type
}

/**
 * Data Rule
 */
export interface ITaskDataRuleItem extends ITaskRuleItem {
    type: TaskType.TYPE_DATA;
    subType: TaskTypeDataSubType;
    assertion: string[];
    arguments: any[];
}

/**
 * Dom Rule
 */
export interface ITaskDomRuleItem extends ITaskRuleItem {
    type: TaskType.TYPE_DOM;
    subType: TaskTypeDomSubType;
    arguments: any[];
}

/**
 * Event Rule
 */
export interface ITaskEventRuleItem extends ITaskRuleItem {
    type: TaskType.TYPE_EVENT;
    subType: TaskTypeEventSubType;
    children: TaskRuleTypeItem[];
}

// Event dialog rule
export interface ITaskEventDialogRuleItem extends ITaskEventRuleItem {
    subType: TaskTypeEventSubType.SUB_TYPE_DIALOG;
    promptText?: string; // A text to enter in prompt. Does not cause any effects if the dialog's type is not prompt. default is "confirm"
}

/**
 * Union Rule
 */
export interface ITaskUnionRuleItem extends ITaskRuleItem {
    type: TaskType.TYPE_UNION;
    subType: TaskTypeUnionSubType;
    children: TaskRuleTypeItem[];
}

/**
 * Time Rule
 */
export interface ITaskTimeRuleItem extends ITaskRuleItem {
    type: TaskType.TYPE_TIME;
    subType: TaskTypeTimeSubType;
}

/**
 * Page Rule
 */
export interface ITaskPageRuleItem extends ITaskRuleItem {
    type: TaskType.TYPE_PAGE;
    subType: TaskTypePageSubType;
}
