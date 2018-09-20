import {MessageType} from '../../types/common';
import {TaskRuleTypeItem, TaskType, TaskTypeDataSubType, TaskTypeDomSubType, TaskTypePageSubType, TaskTypeTimeSubType} from '../../types/task';

import {ITaskDataRuleItem, ITaskDomRuleItem, ITaskEventRuleItem, ITaskPageRuleItem, ITaskTimeRuleItem} from '../../interfaces/task';

import {createErrorMessage, ErrorMessage} from '../common';

/**
 * Valid task rules
 * @param  {TaskRuleTypeItem[]} taskRules Task Rule List
 * @return {Promise<void>}            Promise with nothing
 */
export function validTaskRules(taskRules: TaskRuleTypeItem[]): Promise<void> {
    // Check if task rule is right
    if (taskRules.length === 0) {
        return Promise.reject(new ErrorMessage('Task rule list is empty', MessageType.TASK_RULES_VALID_ERROR));
    }
    const err = loopRules(taskRules);
    if (err) {
        return Promise.reject(createErrorMessage(err, MessageType.TASK_RULES_VALID_ERROR));
    }
    return Promise.resolve();
}

/**
 * Loop through rules & check every rule & rebuild rule
 * @param  {TaskRuleTypeItem[]} taskRules Task Rule List
 * @return {Error}                    Error message
 */
function loopRules(taskRules: TaskRuleTypeItem[], parentIndex?: string): Error {
    let err: Error;
    taskRules.every((taskRule: TaskRuleTypeItem, index: number) => {
        err = assignTaskRule(taskRule);
        // Set rule index
        taskRule.index = parentIndex ? `${parentIndex}-${index}` : `${index}`;
        // if rule's type is event, check children
        if (!err && taskRule.type === TaskType.TYPE_EVENT) {
            err = loopRules(taskRule.children, `${taskRule.index}`);
        }
        if (err) {
            return false;
        }
        return true;
    });
    return err;
}

/**
 * Assign task rule to type check function
 * @param  {TaskRuleTypeItem} taskRule Task Rule
 * @return {Error}                 Error message
 */
function assignTaskRule(taskRule: TaskRuleTypeItem): Error {
    // Check common fields
    if (taskRule.assertion && (taskRule.assertion.length === 0 || taskRule.assertion.some((assertionStr) => {
        return typeof assertionStr !== 'string';
    }))) {
        return new Error('Assertion list can\'t be empty array & list item\'s content must be string');
    }
    switch (taskRule.type) {
        case TaskType.TYPE_DATA:
            return dataTypeCheckAndRebuild(taskRule);
        case TaskType.TYPE_DOM:
            return domTypeCheckAndRebuild(taskRule);
        case TaskType.TYPE_EVENT:
            return eventTypeCheckAndRebuild(taskRule);
        case TaskType.TYPE_PAGE:
            return pageTypeCheckAndRebuild(taskRule);
        case TaskType.TYPE_TIME:
            return timeTypeCheckAndRebuild(taskRule);
    }
}

/**
 * Data type check & rebuild
 * @param  {ITaskDataRuleItem} taskRule Data Rule
 * @return {Error}                  Error message
 */
function dataTypeCheckAndRebuild(taskRule: ITaskDataRuleItem): Error {
    // Valid common fields
    if (!taskRule.assertion) {
        return new Error('Data type rule must have assertion field');
    }
    switch (taskRule.subType) {
        case TaskTypeDataSubType.SUB_TYPE_MYSQL:
            if (!(taskRule.argments && taskRule.argments.length === 1 && typeof taskRule.argments[0] === 'string')) {
                return new Error('SUB_TYPE_MYSQL must have sqlQuery & sqlQuery must be string');
            }
            break;
        case TaskTypeDataSubType.SUB_TYPE_REDIS:
            if (!(taskRule.argments && taskRule.argments.length === 1 && Array.isArray(taskRule.argments[0]))) {
                return new Error('SUB_TYPE_REDIS must have commands && commands must be string[][]');
            }
            break;
    }
}

/**
 * Dom type check & rebuild
 * @param  {ITaskDomRuleItem} taskRule Dom Rule
 * @return {Error}                 Error message
 */
function domTypeCheckAndRebuild(taskRule: ITaskDomRuleItem): Error {
    switch (taskRule.subType) {
        case TaskTypeDomSubType.SUB_TYPE_CLICK:
        case TaskTypeDomSubType.SUB_TYPE_GET_HTML:
        case TaskTypeDomSubType.SUB_TYPE_GET_TEXT:
            if (!(taskRule.argments && taskRule.argments.length === 1 && typeof taskRule.argments[0] === 'string')) {
                return new Error('SUB_TYPE_CLICK/SUB_TYPE_GET_HTML/SUB_TYPE_GET_TEXT must have selector & selector must be string');
            }
            break;
        case TaskTypeDomSubType.SUB_TYPE_KEYBOARD:
            if (!(taskRule.argments && taskRule.argments.length === 2 && typeof taskRule.argments[0] === 'string' && typeof taskRule.argments[1] === 'string')) {
                return new Error('SUB_TYPE_KEYBOARD must have selector, text & selector, text must be string');
            }
            break;
        case TaskTypeDomSubType.SUB_TYPE_GET_ATTR:
            if (!(taskRule.argments && taskRule.argments.length === 2 && typeof taskRule.argments[0] === 'string' && typeof taskRule.argments[1] === 'string')) {
                return new Error('SUB_TYPE_GET_ATTR must have selector, attrName & selector, attrName must be string');
            }
            break;
        case TaskTypeDomSubType.SUB_TYPE_SET_ATTR:
            if (!(taskRule.argments && taskRule.argments.length === 3 &&
                typeof taskRule.argments[0] === 'string' && typeof taskRule.argments[1] === 'string' && typeof taskRule.argments[2] === 'string')) {
                return new Error('SUB_TYPE_SET_ATTR must have selector, attrName, attrValue & selector, attrName, attrValue must be string');
            }
            break;
        case TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES:
            if (!(taskRule.argments && taskRule.argments.length === 2 &&
                typeof taskRule.argments[0] === 'string' && Array.isArray(taskRule.argments[1]))) {
                return new Error('SUB_TYPE_SET_INPUT_FILES must have selector, filesPath & selector must be string & filesPath must be string[]');
            }
    }
}

/**
 * Event type check & rebuild
 * @param  {ITaskEventRuleItem} taskRule Event Rule
 * @return {Error}                   Error message
 */
function eventTypeCheckAndRebuild(taskRule: ITaskEventRuleItem): Error {
    // Valid common fields
    if (!(taskRule.children && Array.isArray(taskRule.children) && taskRule.children.length > 0)) {
        return new Error('Data type rule must have children field');
    }
    if (!(taskRule.argments && (taskRule.argments.length === 1 || taskRule.argments.length === 2)
        && typeof taskRule.argments[0] === 'number')) {
        return new Error('TYPE_EVENT must have timeout & timeout must be millisecond number.');
    }
    if (taskRule.argments[1] && !(typeof taskRule.argments[1] === 'function')) {
        return new Error('if TYPE_EVENT have checkFunc, checkFunc must be function');
    }
    // Change argments checkFunc to string
    if (taskRule.argments.length === 1) {
        taskRule.argments[1] = 'null';
    } else {
        taskRule.argments[1] = taskRule.argments[1].toString();
    }
}

/**
 * Page type check & rebuild
 * @param  {ITaskPageRuleItem} taskRule Page Rule
 * @return {Error}                  Error message
 */
function pageTypeCheckAndRebuild(taskRule: ITaskPageRuleItem): Error {
    switch (taskRule.subType) {
        case TaskTypePageSubType.SUB_TYPE_SET_COOKIE:
        case TaskTypePageSubType.SUB_TYPE_DELETE_COOKIE:
            if (!(taskRule.argments && Array.isArray(taskRule.argments[0]))) {
                return new Error('SUB_TYPE_SET_COOKIE/SUB_TYPE_DELETE_COOKIE must have cookies & cookies must be array');
            }
        case TaskTypePageSubType.SUB_TYPE_GET_COOKIE:
            if (taskRule.argments && !(Array.isArray(taskRule.argments[0]))) {
                return new Error('SUB_TYPE_GET_COOKIE must have urls & urls must be array');
            }
            break;
        case TaskTypePageSubType.SUB_TYPE_GOTO:
            if (!(taskRule.argments && typeof taskRule.argments[0] === 'string')) {
                return new Error('SUB_TYPE_GOTO must have url & url must be array');
            }
            break;
        case TaskTypePageSubType.SUB_TYPE_SCREENSHOT:
            if (taskRule.argments) {
                if (!(typeof taskRule.argments[0] === 'object')) {
                    return new Error('SUB_TYPE_SCREENSHOT\'s option must be object');
                }
            } else {
                taskRule.argments = [{}];
            }
            break;
    }
}

/**
 * Time type check & rebuild
 * @param  {ITaskTimeRuleItem} taskRule Time Rule
 * @return {Error}                  Error message
 */
function timeTypeCheckAndRebuild(taskRule: ITaskTimeRuleItem): Error {
    switch (taskRule.subType) {
        case TaskTypeTimeSubType.SUB_TYPE_SET_SLEEP:
            if (!(taskRule.argments && typeof taskRule.argments[0] === 'number')) {
                return new Error('SUB_TYPE_SET_SLEEP must have sleepTime & sleepTime must be millisecond number.');
            }
            break;
    }
}
