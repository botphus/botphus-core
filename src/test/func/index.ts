import * as assert from 'power-assert';

import {getTaskNoByTaskName} from '../../source/lib/common';

export default function() {
    describe('Function test', () => {
        it('Function#getTaskNoByTaskName', () => {
            const tokenNo = getTaskNoByTaskName('test name');
            assert(tokenNo);
            assert(/[\da-z]{32}/.test(tokenNo));
        });
    });
}
