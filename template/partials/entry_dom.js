{{!-- SUB_TYPE_KEYBOARD --}}
{{#if (eq rule.subType 200)}}
return unitLib.dom.keyboard(page, '{{{replace rule.argments.[0] "'" "\'"}}}', '{{{replace rule.argments.[1] "'" "\'"}}}');
{{/if}}
{{!-- SUB_TYPE_SET_ATTR --}}
{{#if (eq rule.subType 201)}}
return unitLib.dom.setAttr(page, '{{{replace rule.argments.[0] "'" "\'"}}}', '{{{replace rule.argments.[1] "'" "\'"}}}', '{{{replace rule.argments.[2] "'" "\'"}}}');
{{/if}}
{{!-- SUB_TYPE_GET_ATTR --}}
{{#if (eq rule.subType 202)}}
return unitLib.dom.getAttr(page, '{{{replace rule.argments.[0] "'" "\'"}}}', '{{{replace rule.argments.[1] "'" "\'"}}}');
{{/if}}
{{!-- SUB_TYPE_GET_HTML --}}
{{#if (eq rule.subType 203)}}
return unitLib.dom.getAttr(page, '{{{replace rule.argments.[0] "'" "\'"}}}');
{{/if}}
{{!-- SUB_TYPE_GET_TEXT --}}
{{#if (eq rule.subType 204)}}
return unitLib.dom.getText(page, '{{{replace rule.argments.[0] "'" "\'"}}}');
{{/if}}
{{!-- SUB_TYPE_CLICK --}}
{{#if (eq rule.subType 205)}}
return unitLib.dom.click(page, '{{{replace rule.argments.[0] "'" "\'"}}}');
{{/if}}
{{!-- SUB_TYPE_SET_INPUT_FILES --}}
{{#if (eq rule.subType 206)}}
return unitLib.dom.setInputFiles(page, '{{{replace rule.argments.[0] "'" "\'"}}}', {{{JSONstringify rule.argments.[0]}}});
{{/if}}