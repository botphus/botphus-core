import * as assert from 'power-assert';
import * as puppeteer from 'puppeteer';

import botphusUnit from '../../source/lib/unit/';

import * as CONST from '../common/const';

export default function() {
    describe('Unit#Event', () => {
        it('Event#dialog', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                    return browser.newPage()
                        .then((page) => {
                            return page.goto(CONST.NORMAL_PAGE_PATH)
                                .then(() => {
                                    return botphusUnit.event.dialog(page, CONST.EVENT_TIMEOUT, () => {
                                        return botphusUnit.dom.click(page, CONST.NORMAL_PAGE_DIALOG_SELECTOR);
                                    })
                                        .then((dialog) => {
                                            assert(dialog.message() === CONST.DIALOG_VALUE);
                                            assert(dialog.type() === 'alert');
                                            dialog.dismiss();
                                            // Sleep for code run end
                                            return botphusUnit.time.sleep(CONST.SLEEP_TIME);
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
                        });
                });
        });
        it('Event#console', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                    return browser.newPage()
                        .then((page) => {
                            return page.goto(CONST.NORMAL_PAGE_PATH)
                                .then(() => {
                                    return botphusUnit.event.console(page, CONST.EVENT_TIMEOUT, () => {
                                        return botphusUnit.dom.click(page, CONST.NORMAL_PAGE_CONSOLE_SELECTOR);
                                    })
                                        .then((consoleMessage) => {
                                            assert(consoleMessage.type() === 'log');
                                            assert(consoleMessage.args().length === 1);
                                            assert(consoleMessage.text() === CONST.CONSOLE_VALUE);
                                            // Sleep for code run end
                                            return botphusUnit.time.sleep(CONST.SLEEP_TIME);
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
                        });
                });
        });
        it('Event#request & response', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                    return browser.newPage()
                        .then((page) => {
                            return page.goto(CONST.NORMAL_PAGE_PATH)
                                .then(() => {
                                    return Promise.all([botphusUnit.event.request(page, CONST.EVENT_TIMEOUT, () => {
                                        return Promise.resolve();
                                    }, (request) => {
                                        return request.url() === CONST.REQUEST_PATH;
                                    }), botphusUnit.event.response(page, CONST.EVENT_TIMEOUT, () => {
                                        // trigger request
                                        return botphusUnit.dom.click(page, CONST.NORMAL_PAGE_REQUEST_SELECTOR);
                                    }, (response) => {
                                        return response.url() === CONST.REQUEST_PATH;
                                    })])
                                        .then(([request, response]) => {
                                            assert(request.method() === 'GET');
                                            return response.json();
                                        })
                                        .then((resData) => {
                                            assert(resData.url === CONST.REQUEST_PATH);
                                            assert(resData.type === 'User');
                                            // Sleep for code run end
                                            return botphusUnit.time.sleep(CONST.SLEEP_TIME);
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
                        });
                });
        });
    });
}
