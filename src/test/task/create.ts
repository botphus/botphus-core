import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'power-assert';

import * as CONST from '../common/const';

import {getTaskNoByTaskName} from '../../source/lib/common';
import {TaskType, TaskTypeDataSubType, TaskTypeDomSubType, TaskTypeEventSubType, TaskTypePageSubType, TaskTypeTimeSubType} from '../../source/types/task';

import BotphusCore from '../../source/';
const botphusCore = new BotphusCore({
    cachePath: CONST.CACHE_PATH
});

export default function() {
    describe('Task#createTask', () => {
        let mtime: number;
        it('createTask', (done) => {
            const taskName = 'test task';
            botphusCore.createTask(taskName, new Date().getTime(), [
                {
                    argments: ['div'],
                    assertion: ['data.type === `123`', 'data.name === \'123\''],
                    subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                    type: TaskType.TYPE_DOM
                }
            ])
                .then(() => {
                    const stats = fs.statSync(path.join(CONST.CACHE_PATH, '/task-cache/', getTaskNoByTaskName(taskName) + '.js'));
                    mtime = new Date(stats.mtime).getTime();
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
                    subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                    type: TaskType.TYPE_DOM
                }
            ])
                .then(() => {
                    const stats = fs.statSync(path.join(CONST.CACHE_PATH, '/task-cache/', getTaskNoByTaskName(taskName) + '.js'));
                    assert(mtime === new Date(stats.mtime).getTime());
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
                    subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                    type: TaskType.TYPE_DOM
                },
                {
                    argments: [{
                        encoding: 'base64'
                    }],
                    subType: TaskTypePageSubType.SUB_TYPE_SCREENSHOT,
                    type: TaskType.TYPE_PAGE
                }
            ])
                .then(() => {
                    const stats = fs.statSync(path.join(CONST.CACHE_PATH, '/task-cache/', getTaskNoByTaskName(taskName) + '.js'));
                    assert(mtime < new Date(stats.mtime).getTime());
                    done();
                })
                .catch(done);
        });
        it('createTask with children', (done) => {
            const taskName = 'test task2';
            botphusCore.createTask(taskName, new Date().getTime(), [
                {
                    argments: [100, (info: any) => {
                        return info.args;
                    }],
                    children: [
                        {
                            argments: ['div'],
                            subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                            type: TaskType.TYPE_DOM,
                        }
                    ],
                    subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                    type: TaskType.TYPE_EVENT,
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
                        argments: [],
                        assertion: [],
                        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: TaskType.TYPE_DATA,
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
                        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: TaskType.TYPE_DATA,
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
                        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: TaskType.TYPE_DATA,
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
                        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: TaskType.TYPE_DATA,
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
                        subType: TaskTypeDataSubType.SUB_TYPE_REDIS,
                        type: TaskType.TYPE_DATA,
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
                        subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                        type: TaskType.TYPE_DOM,
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
                        subType: TaskTypeDomSubType.SUB_TYPE_KEYBOARD,
                        type: TaskType.TYPE_DOM,
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
                        subType: TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
                        type: TaskType.TYPE_DOM,
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
                        subType: TaskTypeDomSubType.SUB_TYPE_SET_ATTR,
                        type: TaskType.TYPE_DOM,
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
                        subType: TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
                        type: TaskType.TYPE_DOM,
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
                        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: TaskType.TYPE_EVENT,
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
                                subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                                type: TaskType.TYPE_DOM
                            }
                        ],
                        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: TaskType.TYPE_EVENT,
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
                                subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                                type: TaskType.TYPE_DOM
                            }
                        ],
                        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: TaskType.TYPE_EVENT,
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
                        subType: TaskTypePageSubType.SUB_TYPE_SET_COOKIE,
                        type: TaskType.TYPE_PAGE,
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
                        subType: TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
                        type: TaskType.TYPE_PAGE,
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
                        subType: TaskTypePageSubType.SUB_TYPE_GOTO,
                        type: TaskType.TYPE_PAGE,
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
                        argments: ['https://bing.com', ''],
                        subType: TaskTypePageSubType.SUB_TYPE_GOTO,
                        type: TaskType.TYPE_PAGE,
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
                        subType: TaskTypePageSubType.SUB_TYPE_SCREENSHOT,
                        type: TaskType.TYPE_PAGE,
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
                        subType: TaskTypeTimeSubType.SUB_TYPE_SET_SLEEP,
                        type: TaskType.TYPE_TIME,
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
