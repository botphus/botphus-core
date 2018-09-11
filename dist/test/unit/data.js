"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const mysql_1 = require("../../source/lib/connection/mysql");
const redis_1 = require("../../source/lib/connection/redis");
const unit_1 = require("../../source/lib/unit/");
const CONST = require("../common/const");
function default_1() {
    describe('Unit#Data', () => {
        describe('Data#execSql', () => {
            let connectionNo = '';
            before(() => {
                connectionNo = mysql_1.createMysqlConnection(CONST.MYSQL_CONFIG);
            });
            it('Create Table', (done) => {
                unit_1.default.data.execSql(connectionNo, `
                    CREATE TABLE ${CONST.MYSQL_TABLE_NAME} (
                        id int(11) auto_increment NOT NULL,
                        ${CONST.MYSQL_FIELD_NAME} varchar(128) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
                `)
                    .then(() => done())
                    .catch(done);
            });
            it('Inset Data', (done) => {
                unit_1.default.data.execSql(connectionNo, `INSERT INTO ${CONST.MYSQL_TABLE_NAME} (${CONST.MYSQL_FIELD_NAME}) VALUES ("${CONST.MYSQL_FIELD_VALUE}")`)
                    .then(() => {
                    return unit_1.default.data.execSql(connectionNo, `SELECT * FROM ${CONST.MYSQL_TABLE_NAME} WHERE ${CONST.MYSQL_FIELD_NAME} = "${CONST.MYSQL_FIELD_VALUE}"`);
                })
                    .then((data) => {
                    assert(data.length === 1);
                    assert(data[0].id === 1);
                    assert(data[0][CONST.MYSQL_FIELD_NAME] === CONST.MYSQL_FIELD_VALUE);
                    done();
                })
                    .catch(done);
            });
            it('Drop Table', (done) => {
                unit_1.default.data.execSql(connectionNo, `DROP TABLE IF EXISTS ${CONST.MYSQL_TABLE_NAME}`)
                    .then(() => {
                    return unit_1.default.data.execSql(connectionNo, `SHOW TABLES LIKE "${CONST.MYSQL_TABLE_NAME}"`);
                })
                    .then((data) => {
                    assert(data.length === 0);
                    done();
                })
                    .catch(done);
            });
            after(() => {
                mysql_1.mysqlConnectionCache[connectionNo].end();
            });
        });
        describe('Data#execRedis', () => {
            let connectionNo = '';
            before(() => {
                connectionNo = redis_1.createRedisConnection(CONST.REDIS_CONFIG);
            });
            it('Set key', (done) => {
                unit_1.default.data.execRedis(connectionNo, [['set', CONST.REDIS_KEY_NAME, CONST.REDIS_KEY_VALUE]])
                    .then(() => done())
                    .catch(done);
            });
            it('Get key', (done) => {
                unit_1.default.data.execRedis(connectionNo, [['get', CONST.REDIS_KEY_NAME]])
                    .then((datas) => {
                    assert(datas.length === 1);
                    assert(datas[0][1] === CONST.REDIS_KEY_VALUE);
                    done();
                })
                    .catch(done);
            });
            it('Del key', (done) => {
                unit_1.default.data.execRedis(connectionNo, [['del', CONST.REDIS_KEY_NAME]])
                    .then(() => done())
                    .catch(done);
            });
            after(() => {
                redis_1.redisConnectionCache[connectionNo].quit();
            });
        });
    });
}
exports.default = default_1;
