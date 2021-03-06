import * as assert from 'power-assert';

import * as CONST from '../common/const';

import {ITaskExcludeUnit} from '../../source/interfaces/task';
import {MessageType} from '../../source/types/common';
import {TaskMessage} from '../../source/types/task';

import {getTaskNoByTaskName} from '../../source/lib/common';

import BotphusCore from '../../source/';
const botphusCore = new BotphusCore({
    cachePath: CONST.CACHE_PATH
});

export default function() {
    describe('Task#startTask', function() {
        this.timeout(20000);
        it('startTask with fullList', (done) => {
            let curOrder = 0;
            botphusCore.startTask(getTaskNoByTaskName(CONST.TASK_FULL_NAME), CONST.NORMAL_PAGE_PATH, {
                mysqlOption: CONST.MYSQL_CONFIG,
                puppeteerLaunchOption: CONST.PUPPETEER_LAUNCH_OPTION,
                redisOption: CONST.REDIS_CONFIG,
            })
                .then((subprocess) => {
                    subprocess.on('message', ([error, messageData]: TaskMessage) => {
                        // If process has error message
                        if (error) {
                            // kill for cover test
                            subprocess.kill();
                            return done(error.stack);
                        }
                        assert(/^\d{13}$/.test(messageData.sendTime.toString()));
                        // Task start
                        if (messageData.type === MessageType.TASK_START) {
                            assert(messageData.index === 'start');
                        }
                        // Task unit start & end
                        if (messageData.type === MessageType.TASK_UNIT_EXEC_START) {
                            curOrder++;
                        }
                        if (messageData.type === MessageType.TASK_UNIT_EXEC_START || messageData.type === MessageType.TASK_UNIT_EXEC_END) {
                            assert(/^(\d+-)*\d+$/.test(messageData.index));
                            assert(messageData.order === curOrder);
                        }
                        if (messageData.type === MessageType.TASK_UNIT_EXEC_DATA_RECEIVE) {
                            assert(messageData.data);
                        }
                        // Task End
                        if (messageData.type === MessageType.TASK_END) {
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
            const excludeOption: ITaskExcludeUnit = {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true
            };
            botphusCore.startTask(getTaskNoByTaskName(CONST.TASK_FULL_NAME), '', {
                excludeOption,
                puppeteerLaunchOption: CONST.PUPPETEER_LAUNCH_OPTION
            })
                .then((subprocess) => {
                    subprocess.on('message', ([error, messageData]: TaskMessage) => {
                        // If process has error message
                        if (error) {
                            // kill for cover test
                            subprocess.kill();
                            return done(error.stack);
                        }
                        // Task End
                        if (messageData.type === MessageType.TASK_END) {
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
        it('startTask with react rules', (done) => {
            botphusCore.startTask(getTaskNoByTaskName(CONST.TASK_REACT_NAME), CONST.REACT_PAGE_PATH, {
                puppeteerLaunchOption: CONST.PUPPETEER_REACT_LAUNCH_OPTION,
                startPageOption: {
                    waitUntil: 'networkidle0'
                }
            })
                .then((subprocess) => {
                    subprocess.on('message', ([error, messageData]: TaskMessage) => {
                        // If process has error message
                        if (error) {
                            // kill for cover test
                            subprocess.kill();
                            return done(error.stack);
                        }
                        // Task End
                        if (messageData.type === MessageType.TASK_END) {
                            assert(messageData.index === 'end');
                            assert(messageData.totalCase === (CONST.TASK_REACT_LIST_CASE_COUNT));
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
        it('startTask with union block rules', (done) => {
            botphusCore.startTask(getTaskNoByTaskName(CONST.TASK_UNION_BLOCK_NAME), CONST.REACT_PAGE_PATH, {
                puppeteerLaunchOption: CONST.PUPPETEER_REACT_LAUNCH_OPTION,
                startPageOption: {
                    waitUntil: 'networkidle0'
                }
            })
                .then((subprocess) => {
                    subprocess.on('message', ([error, messageData]: TaskMessage) => {
                        // If process has error message
                        if (error) {
                            assert(error.type === MessageType.UNIT_RULE_EXEC_ERROR);
                            assert(error.index === 'union-error');
                            // kill for cover test
                            subprocess.kill();
                            return done();
                        }
                        // Task End
                        if (messageData.type === MessageType.TASK_END) {
                            // kill for cover test
                            subprocess.kill();
                            return done(new Error('Invalid expectation'));
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
        it('startTask with union non-block rules', (done) => {
            botphusCore.startTask(getTaskNoByTaskName(CONST.TASK_UNION_NON_BLOCK_NAME), CONST.REACT_PAGE_PATH, {
                puppeteerLaunchOption: CONST.PUPPETEER_REACT_LAUNCH_OPTION,
                startPageOption: {
                    waitUntil: 'networkidle0'
                }
            })
                .then((subprocess) => {
                    subprocess.on('message', ([error, messageData]: TaskMessage) => {
                        // If process has error message
                        if (error) {
                            // Check error message data
                            assert(error.type === MessageType.UNIT_RULE_EXEC_ERROR);
                            assert(error.index === 'union-error');
                            return;
                        }
                        // Task End
                        if (messageData.type === MessageType.TASK_END) {
                            assert(messageData.index === 'end');
                            assert(messageData.totalCase === (CONST.TASK_UNION_NON_BLOCK_CASE_COUNT));
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
            botphusCore.startTask(getTaskNoByTaskName(CONST.TASK_FULL_NAME) + '1', '')
                .then(() => {
                    done(new Error('Invalid expectation'));
                })
                .catch(() => done());
        });
    });
}
