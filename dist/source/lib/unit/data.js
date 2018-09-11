"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../connection/mysql");
const redis_1 = require("../connection/redis");
function execSql(connectionNo, sqlQuery) {
    return new Promise((resolve, reject) => {
        mysql_1.mysqlConnectionCache[connectionNo].query(sqlQuery, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}
exports.execSql = execSql;
function execRedis(connectionNo, commands) {
    return redis_1.redisConnectionCache[connectionNo].multi(commands).exec();
}
exports.execRedis = execRedis;
