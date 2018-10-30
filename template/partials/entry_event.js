{{!-- SUB_TYPE_REQUEST --}}
{{#if (eq rule.subType 300)}}
const eventFunc = unitLib.event.request;
{{/if}}
{{!-- SUB_TYPE_RESPONSE --}}
{{#if (eq rule.subType 301)}}
const eventFunc = unitLib.event.response;
{{/if}}
{{!-- SUB_TYPE_CONSOLE --}}
{{#if (eq rule.subType 302)}}
const eventFunc = unitLib.event.console;
{{/if}}
{{!-- SUB_TYPE_DIALOG --}}
{{#if (eq rule.subType 303)}}
const eventFunc = unitLib.event.dialog;
{{/if}}
return eventFunc(page, {{rule.arguments.[0]}}, function() {
    return Promise.resolve()
        {{#each rule.children}}
        {{> entry rule=this}}
        {{/each}}
}, {{{rule.arguments.[1]}}})
{{!-- SUB_TYPE_RESPONSE: json data --}}
{{#if (eq rule.subType 301)}}
    .then((response) => {
        const headers = response.headers();
        const contentType = headers['content-type'] || '';
        // Check json data
        if (/json/i.test(contentType)) {
            return response.json();
        } else {
            return response.text();
        }
    })
    {{> data_send rule=this}}
{{/if}}