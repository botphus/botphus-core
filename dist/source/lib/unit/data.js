"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../connection/mysql");
const redis_1 = require("../connection/redis");
/**
 * Exec sql
 * @reference https://github.com/mysqljs/mysql
 * @param  {string}       connectionNo Mysql Connection No
 * @param  {string}       sqlQuery     Mysql Query String
 * @return {Promise<any>}              Promise with return data
 */
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
/**
 * Exec redis
 * @reference https://github.com/luin/ioredis
 * @param  {string}       connectionNo Redis Connection No
 * @param  {string[][]}   commands     Redis Commands
 * @return {Promise<any>}              Promise with return data
 */
function execRedis(connectionNo, commands) {
    return redis_1.redisConnectionCache[connectionNo].multi(commands).exec();
}
exports.execRedis = execRedis;
