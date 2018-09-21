"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const puppeteer = require("puppeteer");
const unit_1 = require("../../source/lib/unit/");
const CONST = require("../common/const");
function default_1() {
    describe('React', function () {
        // Set timeout for dom render time
        this.timeout(60 * 1000);
        it('Submit form & assert form log', (done) => {
            puppeteer.launch(CONST.PUPPETEER_REACT_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    // Set network check for react dom render
                    return unit_1.default.page.goto(page, CONST.REACT_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.event.console(page, CONST.EVENT_TIMEOUT, () => {
                            return unit_1.default.dom.click(page, CONST.REACT_PAGE_FORM_SELECT1_SELECTOR)
                                .then(() => {
                                return unit_1.default.dom.click(page, CONST.REACT_PAGE_OUTSIDE_SELECT1_DROPDOWN_SELECTOR);
                            })
                                .then(() => {
                                return unit_1.default.dom.click(page, CONST.REACT_PAGE_FORM_SELECT2_SELECTOR);
                            })
                                .then(() => {
                                return unit_1.default.dom.click(page, CONST.REACT_PAGE_OUTSIDE_SELECT2_DROPDOWN_SELECTOR);
                            })
                                .then(() => {
                                return unit_1.default.dom.click(page, CONST.REACT_PAGE_FORM_BUTTON_SUBMIT_SELECTOR);
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
exports.default = default_1;
