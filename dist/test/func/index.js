"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const common_1 = require("../../source/lib/common");
function default_1() {
    describe('Function', () => {
        it('Function#getTaskNoByTaskName', () => {
            const tokenNo = common_1.getTaskNoByTaskName('test name');
            assert(tokenNo);
            assert(/[\da-z]{32}/.test(tokenNo));
        });
    });
}
exports.default = default_1;
