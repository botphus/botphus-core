import {ClusterOptions, RedisOptions} from 'ioredis';
import {ConnectionConfig} from 'mysql';
import {LaunchOptions} from 'puppeteer';

import {MessageType} from '../types/common';
import {RuleTypeItem, Type, TypeDataSubType, TypeDomSubType, TypeEventSubType, TypePageSubType, TypeTimeSubType} from '../types/task';

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
interface IruleItem {
    index?: string; // Index number, auto create
    type: Type; // Type
    argments?: any[]; // Rule argments
    assertion?: string[]; // Assertion list
    assertionVarName?: string; // Assertion variable name
    // children: RuleTypeItem[] for some type
}

/**
 * Data Rule
 */
export interface IDataRuleItem extends IruleItem {
    type: Type.TYPE_DATA;
    subType: TypeDataSubType;
    assertion: string[];
    argments: any[];
}

/**
 * Dom Rule
 */
export interface IDomRuleItem extends IruleItem {
    type: Type.TYPE_DOM;
    subType: TypeDomSubType;
    argments: any[];
}

/**
 * Event Rule
 */
export interface IEventRuleItem extends IruleItem {
    type: Type.TYPE_EVENT;
    subType: TypeEventSubType;
    children: RuleTypeItem[];
}

// Event dialog rule
export interface IEventDialogRuleItem extends IEventRuleItem {
    subType: TypeEventSubType.SUB_TYPE_DIALOG;
    promptText?: string; // A text to enter in prompt. Does not cause any effects if the dialog's type is not prompt. default is "confirm"
}

/**
 * Time Rule
 */
export interface ITimeRuleItem extends IruleItem {
    type: Type.TYPE_TIME;
    subType: TypeTimeSubType;
}

/**
 * Page Rule
 */
export interface IPageRuleItem extends IruleItem {
    type: Type.TYPE_PAGE;
    subType: TypePageSubType;
}
