"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../types/common");
const task_1 = require("../../types/task");
const common_2 = require("../common");
/**
 * Valid task rules
 * @param  {TaskRuleTypeItem[]} taskRules Task Rule List
 * @return {Promise<void>}            Promise with nothing
 */
function validTaskRules(taskRules) {
    // Check if task rule is right
    if (taskRules.length === 0) {
        return Promise.reject(new common_2.ErrorMessage('Task rule list is empty', common_1.MessageType.TASK_RULES_VALID_ERROR));
    }
    const err = loopRules(taskRules);
    if (err) {
        return Promise.reject(common_2.createErrorMessage(err, common_1.MessageType.TASK_RULES_VALID_ERROR));
    }
    return Promise.resolve();
}
exports.validTaskRules = validTaskRules;
/**
 * Loop through rules & check every rule & rebuild rule
 * @param  {TaskRuleTypeItem[]} taskRules Task Rule List
 * @return {Error}                    Error message
 */
function loopRules(taskRules, parentIndex) {
    let err;
    taskRules.every((taskRule, index) => {
        err = assignTaskRule(taskRule);
        // Set rule index
        taskRule.index = parentIndex ? `${parentIndex}-${index}` : `${index}`;
        // if rule's type is event, check children
        if (!err && taskRule.type === task_1.TaskType.TYPE_EVENT) {
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
function assignTaskRule(taskRule) {
    // Check common fields
    if (taskRule.assertion && (taskRule.assertion.length === 0 || taskRule.assertion.some((assertionStr) => {
        return typeof assertionStr !== 'string';
    }))) {
        return new Error('Assertion list can\'t be empty array & list item\'s content must be string');
    }
    switch (taskRule.type) {
        case task_1.TaskType.TYPE_DATA:
            return dataTypeCheckAndRebuild(taskRule);
        case task_1.TaskType.TYPE_DOM:
            return domTypeCheckAndRebuild(taskRule);
        case task_1.TaskType.TYPE_EVENT:
            return eventTypeCheckAndRebuild(taskRule);
        case task_1.TaskType.TYPE_PAGE:
            return pageTypeCheckAndRebuild(taskRule);
        case task_1.TaskType.TYPE_TIME:
            return timeTypeCheckAndRebuild(taskRule);
    }
}
/**
 * Data type check & rebuild
 * @param  {ITaskDataRuleItem} taskRule Data Rule
 * @return {Error}                  Error message
 */
function dataTypeCheckAndRebuild(taskRule) {
    // Valid common fields
    if (!taskRule.assertion) {
        return new Error('Data type rule must have assertion field');
    }
    switch (taskRule.subType) {
        case task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL:
            if (!(taskRule.arguments && taskRule.arguments.length === 1 && typeof taskRule.arguments[0] === 'string')) {
                return new Error('SUB_TYPE_MYSQL must have sqlQuery & sqlQuery must be string');
            }
            break;
        case task_1.TaskTypeDataSubType.SUB_TYPE_REDIS:
            if (!(taskRule.arguments && taskRule.arguments.length === 1 && Array.isArray(taskRule.arguments[0]))) {
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
function domTypeCheckAndRebuild(taskRule) {
    switch (taskRule.subType) {
        case task_1.TaskTypeDomSubType.SUB_TYPE_CLICK:
        case task_1.TaskTypeDomSubType.SUB_TYPE_GET_HTML:
        case task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT:
            if (!(taskRule.arguments && taskRule.arguments.length === 1 && typeof taskRule.arguments[0] === 'string')) {
                return new Error('SUB_TYPE_CLICK/SUB_TYPE_GET_HTML/SUB_TYPE_GET_TEXT must have selector & selector must be string');
            }
            break;
        case task_1.TaskTypeDomSubType.SUB_TYPE_KEYBOARD:
            if (!(taskRule.arguments && taskRule.arguments.length === 2 && typeof taskRule.arguments[0] === 'string' && typeof taskRule.arguments[1] === 'string')) {
                return new Error('SUB_TYPE_KEYBOARD must have selector, text & selector, text must be string');
            }
            break;
        case task_1.TaskTypeDomSubType.SUB_TYPE_GET_ATTR:
            if (!(taskRule.arguments && taskRule.arguments.length === 2 && typeof taskRule.arguments[0] === 'string' && typeof taskRule.arguments[1] === 'string')) {
                return new Error('SUB_TYPE_GET_ATTR must have selector, attrName & selector, attrName must be string');
            }
            break;
        case task_1.TaskTypeDomSubType.SUB_TYPE_SET_ATTR:
            if (!(taskRule.arguments && taskRule.arguments.length === 3 &&
                typeof taskRule.arguments[0] === 'string' && typeof taskRule.arguments[1] === 'string' && typeof taskRule.arguments[2] === 'string')) {
                return new Error('SUB_TYPE_SET_ATTR must have selector, attrName, attrValue & selector, attrName, attrValue must be string');
            }
            break;
        case task_1.TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES:
            if (!(taskRule.arguments && taskRule.arguments.length === 2 &&
                typeof taskRule.arguments[0] === 'string' && Array.isArray(taskRule.arguments[1]))) {
                return new Error('SUB_TYPE_SET_INPUT_FILES must have selector, filesPath & selector must be string & filesPath must be string[]');
            }
            break;
    }
}
/**
 * Event type check & rebuild
 * @param  {ITaskEventRuleItem} taskRule Event Rule
 * @return {Error}                   Error message
 */
function eventTypeCheckAndRebuild(taskRule) {
    // Valid common fields
    if (!(taskRule.children && Array.isArray(taskRule.children) && taskRule.children.length > 0)) {
        return new Error('Data type rule must have children field');
    }
    if (!(taskRule.arguments && (taskRule.arguments.length === 1 || taskRule.arguments.length === 2)
        && typeof taskRule.arguments[0] === 'number')) {
        return new Error('TYPE_EVENT must have timeout & timeout must be millisecond number');
    }
    if (taskRule.arguments.length === 2 && !(typeof taskRule.arguments[1] === 'function')) {
        return new Error('if TYPE_EVENT have checkFunc, checkFunc must be function');
    }
    // Change arguments checkFunc to string
    if (taskRule.arguments.length === 1) {
        taskRule.arguments[1] = 'null';
    }
    else {
        taskRule.arguments[1] = taskRule.arguments[1].toString();
    }
}
/**
 * Page type check & rebuild
 * @param  {ITaskPageRuleItem} taskRule Page Rule
 * @return {Error}                  Error message
 */
function pageTypeCheckAndRebuild(taskRule) {
    switch (taskRule.subType) {
        case task_1.TaskTypePageSubType.SUB_TYPE_SET_COOKIE:
        case task_1.TaskTypePageSubType.SUB_TYPE_DELETE_COOKIE:
            if (!(taskRule.arguments && Array.isArray(taskRule.arguments[0]))) {
                return new Error('SUB_TYPE_SET_COOKIE/SUB_TYPE_DELETE_COOKIE must have cookies & cookies must be array');
            }
        case task_1.TaskTypePageSubType.SUB_TYPE_GET_COOKIE:
            if (taskRule.arguments && !(Array.isArray(taskRule.arguments[0]))) {
                return new Error('SUB_TYPE_GET_COOKIE must have urls & urls must be array');
            }
            break;
        case task_1.TaskTypePageSubType.SUB_TYPE_GOTO:
            if (!(taskRule.arguments && (taskRule.arguments.length === 1 || taskRule.arguments.length === 2)
                && typeof taskRule.arguments[0] === 'string')) {
                return new Error('SUB_TYPE_GOTO must have url & url must be array');
            }
            if (taskRule.arguments.length === 2 && !(typeof taskRule.arguments[1] === 'object')) {
                return new Error('if SUB_TYPE_GOTO have option, option must be object');
            }
            break;
        case task_1.TaskTypePageSubType.SUB_TYPE_SCREENSHOT:
            if (taskRule.arguments) {
                if (!(typeof taskRule.arguments[0] === 'object')) {
                    return new Error('SUB_TYPE_SCREENSHOT\'s option must be object');
                }
            }
            else {
                taskRule.arguments = [{}];
            }
            break;
    }
}
/**
 * Time type check & rebuild
 * @param  {ITaskTimeRuleItem} taskRule Time Rule
 * @return {Error}                  Error message
 */
function timeTypeCheckAndRebuild(taskRule) {
    switch (taskRule.subType) {
        case task_1.TaskTypeTimeSubType.SUB_TYPE_SET_SLEEP:
            if (!(taskRule.arguments && typeof taskRule.arguments[0] === 'number')) {
                return new Error('SUB_TYPE_SET_SLEEP must have sleepTime & sleepTime must be millisecond number.');
            }
            break;
    }
}
