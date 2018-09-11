"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const common_1 = require("../../source/lib/common");
function default_1() {
    describe('Function test', () => {
        it('Function#getTaskNoByTaskName', () => {
            const tokenNo = common_1.getTaskNoByTaskName('test name');
            assert(tokenNo);
            assert(/[\da-z]{32}/.test(tokenNo));
        });
        it('Function#getI18nPackage', () => {
            const langPackage = common_1.getI18nPackage('default');
            assert(langPackage);
            assert(langPackage === require('../../source/lang/default'));
        });
        it('Function#getI18nPackage with wrong name', () => {
            try {
                common_1.getI18nPackage('en-US');
            }
            catch (e) {
                assert(e.message.indexOf(`Find i18n package "@botphus-lang/en-US" Error: `) === 0);
            }
        });
    });
}
exports.default = default_1;
