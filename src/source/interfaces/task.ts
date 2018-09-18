import {RuleTypeItem, Type, TypeDataSubType, TypeDomSubType, TypeEventSubType, TypePageSubType, TypeTimeSubType} from '../types/task';

/**
 * Basic rule
 */
interface IruleItem {
    index?: string; // Index number, auto create
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
