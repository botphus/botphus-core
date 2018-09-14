/**
 * Set Task function
 * @index   {{rule.index}}
 * @type    {{rule.type}}
 * @subType {{rule.subType}}
 */
.then(function() {
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
})
{{#if rule.assert}}
// Set assert function
.then(function(data) {
    {{#each rule.assert}}
    if(!({{{this}}})) {
        return Promise.reject(commonLib.createErrorMessage(new Error('Assertion Failed:{{{replace this "'" "\'"}}}'), MessageType.UNIT_RULE_ASSERT_ERROR));
    }
    {{/each}}
})
{{/if}}