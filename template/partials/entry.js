/**
 * Set Task function
 * @index   {{rule.index}}
 * @type    {{rule.type}}
 * @subType {{rule.subType}}
 */
.then(function() {
    if(excludeOption['{{rule.index}}']) return Promise.resolve();
    // Rule exec start notice
    sendProcessMessage([null, MessageType.TASK_UNIT_EXEC_START , '{{rule.index}}']);
    {{!-- TYPE_DATA --}}
    {{#if (eq rule.type 1)}}
    {{> entry_data rule=this}}
    {{/if}}
    {{!-- TYPE_DOM --}}
    {{#if (eq rule.type 2)}}
    {{> entry_dom rule=this}}
    {{/if}}
    {{!-- TYPE_EVENT --}}
    {{#if (eq rule.type 3)}}
    {{> entry_event rule=this}}
    {{/if}}
    {{!-- TYPE_TIME --}}
    {{#if (eq rule.type 4)}}
    {{> entry_time rule=this}}
    {{/if}}
    {{!-- TYPE_PAGE --}}
    {{#if (eq rule.type 5)}}
    {{> entry_page rule=this}}
    {{/if}}
    {{#if rule.assertion}}
    // Set assertion
    .then(function(data) {
        {{#each rule.assertion}}
        if(!({{{this}}})) {
            return Promise.reject(commonLib.createErrorMessage(new Error('Assert Failed:{{{replace this "'" "\'"}}}'), MessageType.UNIT_RULE_ASSERT_ERROR));
        }
        {{/each}}
    })
    {{/if}}
    .then(function() {
        // Rule exec end notice
        return sendProcessMessage([null, MessageType.TASK_UNIT_EXEC_END , '{{rule.index}}']);
    });
})