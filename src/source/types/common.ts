/**
 * Message type for i18n
 */
export enum MessageType {
    // Task Rule message
    TASK_RULES_RENDER_ERROR = 'TASK_RULES_RENDER_ERROR', // when task rule cache render error
    // Unit Rule message
    UNIT_RULE_EXEC_ERROR = 'UNIT_RULE_EXEC_ERROR', // when unit rule exec failed
    UNIT_RULE_ASSERT_ERROR = 'UNIT_ASSERT_ERROR', // when assert unit rule's result error
    // Puppter error
    PUPPTER_INIT_ERROR = 'PUPPTER_INIT_ERROR', // when puppter init failed
}
