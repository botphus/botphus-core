import * as assert from 'power-assert';
import * as puppeteer from 'puppeteer';

import botphusUnit from '../../source/lib/unit/';

import * as CONST from '../common/const';

export default function() {
    describe('React', function() {
        // Set timeout for dom render time
        this.timeout(60 * 1000);
        it('Submit form & assert form log', (done) => {
            puppeteer.launch(CONST.PUPPETEER_REACT_LAUNCH_OPTION)
                .then((browser) => {
                    return browser.newPage()
                        .then((page) => {
                            // Set network check for react dom render
                            return botphusUnit.page.goto(page, CONST.REACT_PAGE_PATH)
                                .then(() => {
                                    return botphusUnit.event.console(page, CONST.EVENT_TIMEOUT, () => {
                                        return botphusUnit.dom.click(page, CONST.REACT_PAGE_FORM_SELECT1_SELECTOR)
                                            .then(() => {
                                                return botphusUnit.dom.click(page, CONST.REACT_PAGE_OUTSIDE_SELECT1_DROPDOWN_SELECTOR);
                                            })
                                            .then(() => {
                                                return botphusUnit.dom.click(page, CONST.REACT_PAGE_FORM_SELECT2_SELECTOR);
                                            })
                                            .then(() => {
                                                return botphusUnit.dom.click(page, CONST.REACT_PAGE_OUTSIDE_SELECT2_DROPDOWN_SELECTOR);
                                            })
                                            .then(() => {
                                                return botphusUnit.dom.click(page, CONST.REACT_PAGE_FORM_BUTTON_SUBMIT_SELECTOR);
                                            });
                                    }, (consoleMessage) => {
                                        return consoleMessage.type() === 'log';
                                    });
                                })
                                .then((consoleMessage) => {
                                    const args = consoleMessage.args();
                                    assert(args.length === 2);
                                    return Promise.all(args.map((arg) => {
                                        return arg.jsonValue();
                                    }));
                                })
                                .then((datas) => {
                                    assert(datas[0] === CONST.REACT_PAGE_CONSOLE_FORM_MESSAGE);
                                    assert(datas[1].select === 'china');
                                    assert(datas[1]['select-multiple'].length === 1);
                                    assert(datas[1]['select-multiple'][0] === 'red');
                                    assert(datas[1]['input-number'] === 3);
                                    assert(datas[1].rate === 3.5);
                                });
                        })
                        .then(() => {
                            browser.close();
                            done();
                        })
                        .catch((err) => {
                            browser.close();
                            done(err);
                        });
                })
                .catch(done);
        });
    });
}
