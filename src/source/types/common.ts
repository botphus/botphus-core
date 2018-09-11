/**
 * Message type for i18n
 */
export enum MessageType {
    // Task Rule message
    TASK_RULES_EMPTY = 'TASK_RULES_EMPTY', // when task rules is empty
    TASK_RULES_RENDER_ERROR = 'TASK_RULES_RENDER_ERROR', // when task rule cache render error
    // Unit Rule message
    UNIT_RULE_ARGUMENT_ERROR = 'UNIT_RULE_ARGUMENT_ERROR', // when unit rule argument is wrong
}
