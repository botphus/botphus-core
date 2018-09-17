/**
 * Message type for i18n
 */
export enum MessageType {
    // Task Rule message
    TASK_RULES_VALID_ERROR = 'TASK_RULES_VALID_ERROR', // When valid task rules error
    TASK_RULES_RENDER_ERROR = 'TASK_RULES_RENDER_ERROR', // When task rules cache render error
    // Unit Rule message
    UNIT_RULE_EXEC_ERROR = 'UNIT_RULE_EXEC_ERROR', // When unit rule exec failed
    UNIT_RULE_ASSERT_ERROR = 'UNIT_ASSERT_ERROR', // When assert unit rule's result error
    // Puppter error
    PUPPTER_INIT_ERROR = 'PUPPTER_INIT_ERROR', // When puppter init failed
    // Task message
    TASK_UNIT_EXEC_START = 'TASK_UNIT_EXEC_START', // When start task unit
    TASK_UNIT_EXEC_END = 'TASK_UNIT_EXEC_END', // When end task unit
}
