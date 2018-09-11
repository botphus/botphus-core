import * as fs from 'fs';
import {join} from 'path';
import * as assert from 'power-assert';
import * as recursive from 'recursive-readdir';

import * as CONST from '../common/const';

import {getTaskNoByTaskName} from '../../source/lib/common';
import {Type, TypeDataSubType} from '../../source/types/task';

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
                    assert: [`data.type === '测试'`, `data.name === '完成'`],
                    subType: TypeDataSubType.SUB_TYPE_MYSQL,
                    type: Type.TYPE_DATA
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
                    assert: [`data.type === '测试'`, `data.name === '完成'`],
                    subType: TypeDataSubType.SUB_TYPE_MYSQL,
                    type: Type.TYPE_DATA
                }
            ])
                .then(() => {
                    fs.readFileSync(join(CONST.CACHE_PATH, '/task-cache/', getTaskNoByTaskName(taskName) + '.js'));
                    done();
                })
                .catch(done);
        });
    });
    describe('Task#removeTask', () => {
        it('removeTask', (done) => {
            const taskName = 'test task';
            botphusCore.removeTask(getTaskNoByTaskName(taskName))
                .then(() => {
                    fs.readFileSync(join(CONST.CACHE_PATH, '/task-cache/', getTaskNoByTaskName(taskName) + '.js'));
                    done(new Error('Invalid expectation'));
                })
                .catch(() => done());
        });
        it('clearTask', (done) => {
            botphusCore.clearTask()
                .then(() => {
                    recursive(CONST.CACHE_PATH, (err, files) => {
                        if (err) {
                            return done(err);
                        }
                        assert(files.length === 0);
                        done();
                    });
                })
                .catch(done);
        });
    });
}
