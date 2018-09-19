"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CONST = require("../common/const");
const task_1 = require("../../source/types/task");
const source_1 = require("../../source/");
const botphusCore = new source_1.default({
    cachePath: CONST.CACHE_PATH
});
function default_1() {
    describe('Task#createTask', () => {
        it('createTask', (done) => {
            const taskName = 'test task';
            botphusCore.createTask(taskName, new Date().getTime(), [
                {
                    argments: ['div'],
                    assertion: ['data.type === `123`', 'data.name === \'123\''],
                    subType: task_1.TypeDomSubType.SUB_TYPE_GET_TEXT,
                    type: task_1.Type.TYPE_DOM
                }
            ])
                .then(() => {
                done();
            })
                .catch(done);
        });
        it('createTask when return cache file', (done) => {
            const taskName = 'test task';
            botphusCore.createTask(taskName, new Date().getTime() - 1000, [
                {
                    argments: ['div'],
                    assertion: ['data.type === `123`', 'data.name === \'123\''],
                    subType: task_1.TypeDomSubType.SUB_TYPE_GET_TEXT,
                    type: task_1.Type.TYPE_DOM
                }
            ])
                .then(() => {
                done();
            })
                .catch(done);
        });
        it('createTask when create new cache file', (done) => {
            const taskName = 'test task';
            botphusCore.createTask(taskName, new Date().getTime(), [
                {
                    argments: ['div'],
                    assertion: ['data.type === `123`', 'data.name === \'123\''],
                    subType: task_1.TypeDomSubType.SUB_TYPE_GET_TEXT,
                    type: task_1.Type.TYPE_DOM
                }
            ])
                .then(() => {
                done();
            })
                .catch(done);
        });
        it('createTask with children', (done) => {
            const taskName = 'test task2';
            botphusCore.createTask(taskName, new Date().getTime(), [
                {
                    argments: [100, (info) => {
                            return info.args;
                        }],
                    children: [
                        {
                            argments: ['div'],
                            subType: task_1.TypeDomSubType.SUB_TYPE_CLICK,
                            type: task_1.Type.TYPE_DOM,
                        }
                    ],
                    subType: task_1.TypeEventSubType.SUB_TYPE_CONSOLE,
                    type: task_1.Type.TYPE_EVENT,
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
                        argments: [],
                        assertion: [],
                        subType: task_1.TypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.Type.TYPE_DATA,
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
                        argments: [],
                        assertion: [{}],
                        subType: task_1.TypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.Type.TYPE_DATA,
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
                        argments: [],
                        subType: task_1.TypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.Type.TYPE_DATA,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong data mysql rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [],
                        assertion: ['data === "test"'],
                        subType: task_1.TypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.Type.TYPE_DATA,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong data redis rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [],
                        assertion: ['data === "test"'],
                        subType: task_1.TypeDataSubType.SUB_TYPE_REDIS,
                        type: task_1.Type.TYPE_DATA,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong dom click rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [],
                        subType: task_1.TypeDomSubType.SUB_TYPE_CLICK,
                        type: task_1.Type.TYPE_DOM,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong dom keyboard rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [],
                        subType: task_1.TypeDomSubType.SUB_TYPE_KEYBOARD,
                        type: task_1.Type.TYPE_DOM,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong dom getAttr rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [],
                        subType: task_1.TypeDomSubType.SUB_TYPE_GET_ATTR,
                        type: task_1.Type.TYPE_DOM,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong dom setAttr rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [],
                        subType: task_1.TypeDomSubType.SUB_TYPE_SET_ATTR,
                        type: task_1.Type.TYPE_DOM,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong dom setInputfiles rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [],
                        subType: task_1.TypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
                        type: task_1.Type.TYPE_DOM,
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
                        subType: task_1.TypeEventSubType.SUB_TYPE_CONSOLE,
                        type: task_1.Type.TYPE_EVENT,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong event rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [],
                        children: [
                            {
                                argments: ['div'],
                                assertion: ['data.type === `123`', 'data.name === \'123\''],
                                subType: task_1.TypeDomSubType.SUB_TYPE_GET_TEXT,
                                type: task_1.Type.TYPE_DOM
                            }
                        ],
                        subType: task_1.TypeEventSubType.SUB_TYPE_CONSOLE,
                        type: task_1.Type.TYPE_EVENT,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong event rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [100, 'test'],
                        children: [
                            {
                                argments: ['div'],
                                assertion: ['data.type === `123`', 'data.name === \'123\''],
                                subType: task_1.TypeDomSubType.SUB_TYPE_GET_TEXT,
                                type: task_1.Type.TYPE_DOM
                            }
                        ],
                        subType: task_1.TypeEventSubType.SUB_TYPE_CONSOLE,
                        type: task_1.Type.TYPE_EVENT,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong page setCookie rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [],
                        subType: task_1.TypePageSubType.SUB_TYPE_SET_COOKIE,
                        type: task_1.Type.TYPE_PAGE,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong page getCookie rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [],
                        subType: task_1.TypePageSubType.SUB_TYPE_GET_COOKIE,
                        type: task_1.Type.TYPE_PAGE,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong page goto rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [],
                        subType: task_1.TypePageSubType.SUB_TYPE_GOTO,
                        type: task_1.Type.TYPE_PAGE,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong page screenshot rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: ['test'],
                        subType: task_1.TypePageSubType.SUB_TYPE_SCREENSHOT,
                        type: task_1.Type.TYPE_PAGE,
                    }
                ])
                    .then(() => {
                    done(new Error('Invalid expectation'));
                })
                    .catch(() => done());
            });
            it('createTask with wrong time sleep rule argments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        argments: [],
                        subType: task_1.TypeTimeSubType.SUB_TYPE_SET_SLEEP,
                        type: task_1.Type.TYPE_TIME,
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
