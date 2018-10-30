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
                    arguments: ['div'],
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
                    arguments: ['div'],
                    assertion: ['data.type === `123`', 'data.name === \'123\''],
                    subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                    type: TaskType.TYPE_DOM
                }
            ])
                .then(() => {
                    setTimeout(() => {
                        const stats = fs.statSync(path.join(CONST.CACHE_PATH, '/task-cache/', getTaskNoByTaskName(taskName) + '.js'));
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
                    subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                    type: TaskType.TYPE_DOM
                },
                {
                    arguments: [{
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
                    arguments: [100, (info: any) => {
                        return info.args;
                    }],
                    children: [
                        {
                            arguments: ['div'],
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
                        arguments: [],
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
                        arguments: [],
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
                        arguments: [],
                        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: TaskType.TYPE_DATA,
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
                        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: TaskType.TYPE_DATA,
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
                        subType: TaskTypeDataSubType.SUB_TYPE_REDIS,
                        type: TaskType.TYPE_DATA,
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
                        subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                        type: TaskType.TYPE_DOM,
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
                        subType: TaskTypeDomSubType.SUB_TYPE_KEYBOARD,
                        type: TaskType.TYPE_DOM,
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
                        subType: TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
                        type: TaskType.TYPE_DOM,
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
                        subType: TaskTypeDomSubType.SUB_TYPE_SET_ATTR,
                        type: TaskType.TYPE_DOM,
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
            it('createTask with wrong event rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        children: [
                            {
                                arguments: ['div'],
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
            it('createTask with wrong event rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [100, 'test'],
                        children: [
                            {
                                arguments: ['div'],
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
            it('createTask with wrong page setCookie rule arguments', (done) => {
                const taskName = 'test task';
                botphusCore.createTask(taskName, new Date().getTime(), [
                    {
                        arguments: [],
                        subType: TaskTypePageSubType.SUB_TYPE_SET_COOKIE,
                        type: TaskType.TYPE_PAGE,
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
                        subType: TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
                        type: TaskType.TYPE_PAGE,
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
                        arguments: ['https://bing.com', ''],
                        subType: TaskTypePageSubType.SUB_TYPE_GOTO,
                        type: TaskType.TYPE_PAGE,
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
                        subType: TaskTypePageSubType.SUB_TYPE_SCREENSHOT,
                        type: TaskType.TYPE_PAGE,
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
