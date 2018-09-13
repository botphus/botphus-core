/**
 * Set Task function
 * @type    {{rule.type}}
 * @subType {{rule.subType}}
 */
.then(function() {
    {{!-- TYPE_DOM --}}
    {{#if (eq rule.type 2)}}
    {{!-- SUB_TYPE_KEYBOARD --}}
    {{#if (eq rule.subType 200)}}
    return unitLib.dom.keyboard(page, '{{{replace rule.argments.[0] "'" "\'"}}}', '{{{replace rule.argments.[1] "'" "\'"}}}');
    {{/if}}
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