"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
const common_1 = require("../common");
exports.redisConnectionCache = {};
/**
 * Create redis connection
 * @param  {Redis.RedisOptions | Redis.ClusterOptions} config [description]
 * @return {string}                  [description]
 */
function createRedisConnection(config) {
    const redisNo = common_1.createHash(JSON.stringify(config));
    if (exports.redisConnectionCache[redisNo]) {
        return redisNo;
    }
    // for redis cluster config
    if (Array.isArray(config)) {
        exports.redisConnectionCache[redisNo] = new Redis.Cluster(config);
        return redisNo;
    }
    // for redis config
    exports.redisConnectionCache[redisNo] = new Redis(config);
    return redisNo;
}
exports.createRedisConnection = createRedisConnection;
