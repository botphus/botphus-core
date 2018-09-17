import {mysqlConnectionCache} from '../connection/mysql';
import {redisConnectionCache} from '../connection/redis';

/**
 * Exec sql
 * @reference https://github.com/mysqljs/mysql
 * @param  {string}       connectionNo Mysql Connection No
 * @param  {string}       sqlQuery     Mysql Query String
 * @return {Promise<any>}              Promise with return data
 */
export function execSql(connectionNo: string, sqlQuery: string): Promise<any> {
    return new Promise((resolve, reject) => {
        mysqlConnectionCache[connectionNo].query(sqlQuery, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

/**
 * Exec redis
 * @reference https://github.com/luin/ioredis
 * @param  {string}       connectionNo Redis Connection No
 * @param  {string[][]}   commands     Redis Commands
 * @return {Promise<any>}              Promise with return data
 */
export function execRedis(connectionNo: string, commands: string[][]): Promise<any> {
    return redisConnectionCache[connectionNo].multi(commands).exec();
}
