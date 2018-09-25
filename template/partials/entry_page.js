{{!-- SUB_TYPE_RELOAD --}}
{{#if (eq rule.subType 500)}}
return unitLib.page.reload(page)
{{/if}}
{{!-- SUB_TYPE_SET_COOKIE --}}
{{#if (eq rule.subType 501)}}
return unitLib.page.setCookie(page, {{{JSONstringify rule.argments.[0]}}})
{{/if}}
{{!-- SUB_TYPE_GET_COOKIE --}}
{{#if (eq rule.subType 502)}}
return unitLib.page.getCookie(page, {{{JSONstringify rule.argments.[0]}}})
{{> data_send rule=this}}
{{/if}}
{{!-- SUB_TYPE_DELETE_COOKIE --}}
{{#if (eq rule.subType 503)}}
return unitLib.page.deleteCookie(page, {{{JSONstringify rule.argments.[0]}}})
{{/if}}
{{!-- SUB_TYPE_GOTO --}}
{{#if (eq rule.subType 504)}}
return unitLib.page.goto(page, '{{{replace rule.argments.[0] "'" "\'"}}}')
{{/if}}
{{!-- SUB_TYPE_SCREENSHOT --}}
{{#if (eq rule.subType 505)}}
return unitLib.page.screenShot(page, {{{JSONstringify rule.argments.[0]}}})
{{/if}}