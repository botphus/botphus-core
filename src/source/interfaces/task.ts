import {RuleTypeItem, Type, TypeDataSubType, TypeDomSubType, TypeEventSubType, TypePageSubType, TypeTimeSubType} from '../types/task';

/**
 * 基础规则定义
 */
interface IruleItem {
    index?: string; // 索引
    argments?: any[]; // 规则参数
    assertion?: string[]; // 数据断言字符串
}

/**
 * 数据类规则
 */
export interface IDataRuleItem extends IruleItem {
    type: Type.TYPE_DATA;
    subType: TypeDataSubType;
    assertion: string[];
    argments: any[];
}

/**
 * DOM类规则
 */
export interface IDomRuleItem extends IruleItem {
    type: Type.TYPE_DOM;
    subType: TypeDomSubType;
    argments: any[];
}

/**
 * 事件类规则
 */
export interface IEventRuleItem extends IruleItem {
    type: Type.TYPE_EVENT;
    subType: TypeEventSubType;
    children: RuleTypeItem[];
}

/**
 * 时间类规则
 */
export interface ITimeRuleItem extends IruleItem {
    type: Type.TYPE_TIME;
    subType: TypeTimeSubType;
}

/**
 * 页面类规则
 */
export interface IPageRuleItem extends IruleItem {
    type: Type.TYPE_PAGE;
    subType: TypePageSubType;
}
