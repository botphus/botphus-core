import * as fs from 'fs';
import {join} from 'path';

import * as CONST from '../common/const';

import {getTaskNoByTaskName} from '../../source/lib/common';
import {Type, TypeDomSubType, TypeEventSubType} from '../../source/types/task';

import BotphusCore from '../../source/';
const botphusCore = new BotphusCore({
    cachePath: CONST.CACHE_PATH
});

export default function() {
    describe('Task#createTask', () => {
        it('createTask', (done) => {
            const taskName = 'test task';
            botphusCore.createTask(taskName, new Date().getTime(), [
                {
                    argments: ['div'],
                    assertion: ['data.type === `123`', 'data.name === \'123\''],
                    subType: TypeDomSubType.SUB_TYPE_GET_TEXT,
                    type: Type.TYPE_DOM
                }
            ])
                .then(() => {
                    fs.readFileSync(join(CONST.CACHE_PATH, '/task-cache/', getTaskNoByTaskName(taskName) + '.js'));
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
                            subType: TypeDomSubType.SUB_TYPE_CLICK,
                            type: Type.TYPE_DOM,
                        }
                    ],
                    subType: TypeEventSubType.SUB_TYPE_CONSOLE,
                    type: Type.TYPE_EVENT,
                }
            ])
                .then(() => {
                    fs.readFileSync(join(CONST.CACHE_PATH, '/task-cache/', getTaskNoByTaskName(taskName) + '.js'));
                    done();
                })
                .catch(done);
        });
        it('createTask with fullList', (done) => {
            botphusCore.createTask(CONST.TASK_FULL_NAME, new Date().getTime(), CONST.TASK_FULL_LIST)
                .then(() => {
                    fs.readFileSync(join(CONST.CACHE_PATH, '/task-cache/', getTaskNoByTaskName(CONST.TASK_FULL_NAME) + '.js'));
                    done();
                })
                .catch(done);
        });
    });
}
