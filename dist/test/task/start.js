"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const CONST = require("../common/const");
const common_1 = require("../../source/types/common");
const common_2 = require("../../source/lib/common");
const source_1 = require("../../source/");
const botphusCore = new source_1.default({
    cachePath: CONST.CACHE_PATH
});
function default_1() {
    describe('Task#startTask', function () {
        this.timeout(20000);
        it('startTask with fullList', (done) => {
            let curOrder = 0;
            botphusCore.startTask(common_2.getTaskNoByTaskName(CONST.TASK_FULL_NAME), CONST.NORMAL_PAGE_PATH, {
                mysqlOption: CONST.MYSQL_CONFIG,
                puppeteerLaunchOption: CONST.PUPPETEER_LAUNCH_OPTION,
                redisOption: CONST.REDIS_CONFIG,
            })
                .then((subprocess) => {
                subprocess.on('message', ([error, messageData]) => {
                    // If process has error message
                    if (error) {
                        // kill for cover test
                        subprocess.kill();
                        return done(error.stack);
                    }
                    assert(/^\d{13}$/.test(messageData.sendTime.toString()));
                    // Task start
                    if (messageData.type === common_1.MessageType.TASK_START) {
                        assert(messageData.index === 'start');
                    }
                    // Task unit start & end
                    if (messageData.type === common_1.MessageType.TASK_UNIT_EXEC_START) {
                        curOrder++;
                    }
                    if (messageData.type === common_1.MessageType.TASK_UNIT_EXEC_START || messageData.type === common_1.MessageType.TASK_UNIT_EXEC_END) {
                        assert(/^(\d+-)*\d+$/.test(messageData.index));
                        assert(messageData.order === curOrder);
                    }
                    if (messageData.type === common_1.MessageType.TASK_UNIT_EXEC_DATA_RECEIVE) {
                        assert(messageData.data);
                    }
                    // Task End
                    if (messageData.type === common_1.MessageType.TASK_END) {
                        assert(messageData.index === 'end');
                        assert(messageData.totalCase === CONST.TASK_FULL_LIST_CASE_COUNT);
                        // kill for cover test
                        subprocess.kill();
                        return done();
                    }
                });
                // Listen close event
                subprocess.on('close', (code) => {
                    if (code === 0 || !code) {
                        return;
                    }
                    return done(new Error('Error exit'));
                });
            })
                .catch(done);
        });
        it('startTask with excludeOption', (done) => {
            const excludeOption = {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true
            };
            botphusCore.startTask(common_2.getTaskNoByTaskName(CONST.TASK_FULL_NAME), '', {
                excludeOption,
                puppeteerLaunchOption: CONST.PUPPETEER_LAUNCH_OPTION
            })
                .then((subprocess) => {
                subprocess.on('message', ([error, messageData]) => {
                    // If process has error message
                    if (error) {
                        // kill for cover test
                        subprocess.kill();
                        return done(error.stack);
                    }
                    // Task End
                    if (messageData.type === common_1.MessageType.TASK_END) {
                        assert(messageData.index === 'end');
                        assert(messageData.totalCase === (CONST.TASK_FULL_LIST_CASE_COUNT - Object.keys(excludeOption).length));
                        // kill for cover test
                        subprocess.kill();
                        return done();
                    }
                });
                // Listen close event
                subprocess.on('close', (code) => {
                    if (code === 0 || !code) {
                        return;
                    }
                    return done(new Error('Error exit'));
                });
            })
                .catch(done);
        });
        it('startTask with wrong number', (done) => {
            botphusCore.startTask(common_2.getTaskNoByTaskName(CONST.TASK_FULL_NAME) + '1', '')
                .then(() => {
                done(new Error('Invalid expectation'));
            })
                .catch(() => done());
        });
    });
}
exports.default = default_1;
