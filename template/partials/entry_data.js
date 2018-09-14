{{!-- SUB_TYPE_MYSQL --}}
{{#if (and (eq rule.subType 100) mysqlConnectionNo)}}
return unitLib.data.execSql(mysqlConnectionNo, '{{{replace rule.argments.[1] "'" "\'"}}}');
{{/if}}
{{!-- SUB_TYPE_REDIS --}}
{{#if (and (eq rule.subType 101) redisConnectionNo)}}
return unitLib.data.execRedis(redisConnectionNo, {{{JSONstringify rule.argments.[1]}}});
{{/if}}