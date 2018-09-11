type:{{data.type}}
subType:{{data.subType}}
{{#if data.children}}
    {{#each data.children}}
        {{> entry data=this}}
    {{/each}}
{{/if}}