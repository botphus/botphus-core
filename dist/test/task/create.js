"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const assert = require("power-assert");
const CONST = require("../common/const");
const common_1 = require("../../source/lib/common");
const task_1 = require("../../source/types/task");
const source_1 = require("../../source/");
const botphusCore = new source_1.default({
    cachePath: CONST.CACHE_PATH
});
function default_1() {
    describe('Task#createTask', () => {
        let mtime;
        it('createTask', (done) => {
            const taskName = 'test task';
            botphusCore.createTask(taskName, new Date().getTime(), [
                {
                    arguments: ['div'],
                    assertion: ['data.type === `123`', 'data.name === \'123\''],
                    subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                    type: task_1.TaskType.TYPE_DOM
                }
            ])
                .then(() => {
                const stats = fs.statSync(path.join(CONST.CACHE_PATH, '/task-cache/', common_1.getTaskNoByTaskName(taskName) + '.js'));
                mtime = new Date(stats.mtime).getTime();
                done();
            })
                .catch(done);
        });
        it('createTask when return cache file', (done) => {
            const taskName = 'test task';
            botphusCore.createTask(taskName, new Date().getTime() - 1000, [
                {
                    arguments: ['div'],
                    assertion: ['data.type === `123`', 'data.name === \'123\''],
                    subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                    type: task_1.TaskType.TYPE_DOM
                }
            ])
                .then(() => {
                setTimeout(() => {
                    const stats = fs.statSync(path.join(CONST.CACHE_PATH, '/task-cache/', common_1.getTaskNoByTaskName(taskName) + '.js'));
                    assert(mtime === new Date(stats.mtime).getTime());
                    done();
                }, 100);
            })
                .catch(done);
        });
        it('createTask when create new cache file', (done) => {
            const taskName = 'test task';
            botphusCore.createTask(taskName, new Date().getTime(), [
                {
                    arguments: ['div'],
                    assertion: ['data.type === `123`', 'data.name === \'123\''],
                    subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                    type: task_1.TaskType.TYPE_DOM
                },
                {
                    arguments: [{
                            encoding: 'base64'
                        }],
                    subType: task_1.TaskTypePageSubType.SUB_TYPE_SCREENSHOT,
                    type: task_1.TaskType.TYPE_PAGE
                }
            ])
                .then(() => {
                const stats = fs.statSync(path.join(CONST.CACHE_PATH, '/task-cache/', common_1.getTaskNoByTaskName(taskName) + '.js'));
                assert(mtime < new Date(stats.mtime).getTime());
                done();
            })
                .catch(done);
        });
        it('createTask with children', (done) => {
            const taskName = 'test task2';
            botphusCore.createTask(taskName, new Date().getTime(), [
                {
                    arguments: [100, (info) => {
                            return info.args;
                        }],
                    children: [
                        {
                            arguments: ['div'],
                            subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                            type: task_1.TaskType.TYPE_DOM,
                        }
                    ],
                    subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                    type: task_1.TaskType.TYPE_EVENT,
                }
            ])
                .then(() => {
                done();
            })
                .catch(done);
        });
        it('createTask with full rules', (done) => {
            botphusCore.createTask(CONST.TASK_FULL_NAME, new Date().getTime(), CONST.TASK_FULL_LIST)
                .then(() => {
                done();
            })
                .catch(done);
        });
        it('createTask with react rules', (done) => {
            botphusCore.createTask(CONST.TASK_REACT_NAME, new Date().getTime(), CONST.TASK_REACT_LIST)
                .then(() => {
                done();
            })
                .catch(done);
        });
        describe('Error', () => {
            it('createTask with empty rules', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with empty data rule assertion', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        assertion: [],
                        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.TaskType.TYPE_DATA,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong data rule assertion', (done) => {
                const taskName = 'test task';
                // @ts-ignore
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        assertion: [{}],
                        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.TaskType.TYPE_DATA,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask error without data rule assertion', (done) => {
                const taskName = 'test task';
                // @ts-ignore
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.TaskType.TYPE_DATA,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong data mysql rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        assertion: ['data === "test"'],
                        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.TaskType.TYPE_DATA,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong data redis rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        assertion: ['data === "test"'],
                        subType: task_1.TaskTypeDataSubType.SUB_TYPE_REDIS,
                        type: task_1.TaskType.TYPE_DATA,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong dom click rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                        type: task_1.TaskType.TYPE_DOM,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong dom keyboard rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_KEYBOARD,
                        type: task_1.TaskType.TYPE_DOM,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong dom getAttr rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
                        type: task_1.TaskType.TYPE_DOM,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong dom setAttr rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_SET_ATTR,
                        type: task_1.TaskType.TYPE_DOM,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong dom setInputfiles rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
                        type: task_1.TaskType.TYPE_DOM,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong event rule', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        children: [],
                        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: task_1.TaskType.TYPE_EVENT,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong event rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        children: [
                            {
                                arguments: ['div'],
                                assertion: ['data.type === `123`', 'data.name === \'123\''],
                                subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                                type: task_1.TaskType.TYPE_DOM
                            }
                        ],
                        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: task_1.TaskType.TYPE_EVENT,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong event rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [100, 'test'],
                        children: [
                            {
                                arguments: ['div'],
                                assertion: ['data.type === `123`', 'data.name === \'123\''],
                                subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                                type: task_1.TaskType.TYPE_DOM
                            }
                        ],
                        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: task_1.TaskType.TYPE_EVENT,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong page setCookie rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        subType: task_1.TaskTypePageSubType.SUB_TYPE_SET_COOKIE,
                        type: task_1.TaskType.TYPE_PAGE,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong page getCookie rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        subType: task_1.TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
                        type: task_1.TaskType.TYPE_PAGE,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong page goto rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        subType: task_1.TaskTypePageSubType.SUB_TYPE_GOTO,
                        type: task_1.TaskType.TYPE_PAGE,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong page goto rule option argment', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: ['https://bing.com', ''],
                        subType: task_1.TaskTypePageSubType.SUB_TYPE_GOTO,
                        type: task_1.TaskType.TYPE_PAGE,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong page screenshot rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: ['test'],
                        subType: task_1.TaskTypePageSubType.SUB_TYPE_SCREENSHOT,
                        type: task_1.TaskType.TYPE_PAGE,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong time sleep rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        subType: task_1.TaskTypeTimeSubType.SUB_TYPE_SET_SLEEP,
                        type: task_1.TaskType.TYPE_TIME,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
        });
    });
}
exports.default = default_1;
