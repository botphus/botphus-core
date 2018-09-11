import * as assert from 'power-assert';

import {getI18nPackage, getTaskNoByTaskName} from '../../source/lib/common';

export default function() {
    describe('Function test', () => {
        it('Function#getTaskNoByTaskName', () => {
            const tokenNo = getTaskNoByTaskName('test name');
            assert(tokenNo);
            assert(/[\da-z]{32}/.test(tokenNo));
        });
        it('Function#getI18nPackage', () => {
            const langPackage = getI18nPackage('default');
            assert(langPackage);
            assert(langPackage === require('../../source/lang/default'));
        });
        it('Function#getI18nPackage with wrong name', () => {
            try {
                getI18nPackage('en-US');
            } catch (e) {
                assert(e.message.indexOf(`Find i18n package "@botphus-lang/en-US" Error: `) === 0);
            }
        });
    });
}
