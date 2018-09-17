"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
const CONST = require("../common/const");
const common_1 = require("../../source/lib/common");
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
                fs.readFileSync(path_1.join(CONST.CACHE_PATH, '/task-cache/', common_1.getTaskNoByTaskName(taskName) + '.js'));
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
                fs.readFileSync(path_1.join(CONST.CACHE_PATH, '/task-cache/', common_1.getTaskNoByTaskName(taskName) + '.js'));
                done();
            })
                .catch(done);
        });
        it('createTask with fullList', (done) => {
            botphusCore.createTask(CONST.TASK_FULL_NAME, new Date().getTime(), CONST.TASK_FULL_LIST)
                .then(() => {
                fs.readFileSync(path_1.join(CONST.CACHE_PATH, '/task-cache/', common_1.getTaskNoByTaskName(CONST.TASK_FULL_NAME) + '.js'));
                done();
            })
                .catch(done);
        });
    });
}
exports.default = default_1;
