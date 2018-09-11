import * as Redis from 'ioredis';
import {createHash} from '../common';

export const redisConnectionCache: {
    [propName: string]: Redis.Redis
} = {};

/**
 * Create redis connection
 * @param  {Redis.RedisOptions | Redis.ClusterOptions} config [description]
 * @return {string}                  [description]
 */
export function createRedisConnection(config: Redis.RedisOptions | Redis.ClusterOptions): string {
    const redisNo: string = createHash(JSON.stringify(config));
    if (redisConnectionCache[redisNo]) {
        return redisNo;
    }
    // for redis cluster config
    if (Array.isArray(config)) {
        redisConnectionCache[redisNo] = new Redis.Cluster(config);
        return redisNo;
    }
    // for redis config
    redisConnectionCache[redisNo] = new Redis(config);
    return redisNo;
}
