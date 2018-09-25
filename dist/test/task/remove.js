"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
const assert = require("power-assert");
const recursive = require("recursive-readdir");
const CONST = require("../common/const");
const common_1 = require("../../source/lib/common");
const source_1 = require("../../source/");
const botphusCore = new source_1.default({
    cachePath: CONST.CACHE_PATH
});
function default_1() {
    describe('Task#removeTask', () => {
        it('removeTask', (done) => {
            const taskName = 'test task';
            botphusCore.removeTask(common_1.getTaskNoByTaskName(taskName))
                .then(() => {
                fs.readFileSync(path_1.join(CONST.CACHE_PATH, '/task-cache/', common_1.getTaskNoByTaskName(taskName) + '.js'));
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
exports.default = default_1;