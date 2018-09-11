import {mysqlConnectionCache} from '../connection/mysql';
import {redisConnectionCache} from '../connection/redis';

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

export function execRedis(connectionNo: string, commands: string[][]): Promise<any> {
    return redisConnectionCache[connectionNo].multi(commands).exec();
}
