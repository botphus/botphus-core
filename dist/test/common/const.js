"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const path = require("path");
const task_1 = require("../../source/types/task");
// value
exports.SEARCH_SELECTOR_VALUE = 'Botphus value';
exports.EVENT_TIMEOUT = 3000;
exports.SLEEP_TIME = 100;
exports.DIALOG_VALUE = 'botphus dialog';
exports.CONSOLE_VALUE = 'botphus console';
exports.COOKIE_NAME = 'botphus';
exports.COOKIE_VALUE = 'botphus cookie value';
exports.COOKIE_URL = 'https://github.com/';
exports.COOKIE_DOMAIN = 'github.com';
// Task cache
exports.CACHE_PATH = path.join(os_1.tmpdir(), '/botphus/');
// Normal page
exports.NORMAL_PAGE_PATH = 'file://' + path.join(__dirname, '../../../test/src/normal_test_page.html');
exports.NORMAL_PAGE_SEARCH_SELECTOR = 'form:nth-child(3) > div:nth-child(1) > #search';
exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR = 'form:nth-child(3) > div:nth-child(1)';
exports.NORMAL_PAGE_FILE_SELECTOR = 'form:nth-child(3) > div:nth-child(2) > #file';
exports.NORMAL_PAGE_FILE_MULTI_SELECTOR = 'form:nth-child(3) > div:nth-child(3) > #file-multi';
exports.NORMAL_PAGE_DIALOG_SELECTOR = 'div:nth-child(2) > #dialog';
exports.NORMAL_PAGE_CONSOLE_SELECTOR = 'div:nth-child(2) > #console';
exports.NORMAL_PAGE_REQUEST_SELECTOR = 'div:nth-child(2) > #request';
exports.NORMAL_PAGE_SEARCH_SELECTOR_FIELD = 'value';
exports.NORMAL_PAGE_FILE_SELECTOR_FIELD = 'files';
exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR_HTML = '<label for="search">搜索名称</label><input type="text" name="search" id="search">';
exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR_TEXT = '搜索名称';
// React Page
exports.REACT_PAGE_PATH = 'file://' + path.join(__dirname, '../../../test/src/react_test_page.html');
exports.REACT_PAGE_FORM_SELECTOR = '#container > form:nth-child(1)';
exports.REACT_PAGE_FORM_ITEM_SELECTOR = '.ant-form-item-control-wrapper:nth-child(2) .ant-form-item-children';
exports.REACT_PAGE_FORM_SELECT1_SELECTOR = `${exports.REACT_PAGE_FORM_SELECTOR} > .ant-form-item:nth-child(2) > ${exports.REACT_PAGE_FORM_ITEM_SELECTOR}`;
exports.REACT_PAGE_FORM_SELECT2_SELECTOR = `${exports.REACT_PAGE_FORM_SELECTOR} > .ant-form-item:nth-child(3) > ${exports.REACT_PAGE_FORM_ITEM_SELECTOR}`;
exports.REACT_PAGE_FORM_BUTTON_SELECTOR = `${exports.REACT_PAGE_FORM_SELECTOR} > .ant-form-item:nth-child(12) .ant-form-item-children`;
exports.REACT_PAGE_FORM_BUTTON_SUBMIT_SELECTOR = `${exports.REACT_PAGE_FORM_BUTTON_SELECTOR} > button:nth-child(1)`;
exports.REACT_PAGE_OUTSIDE_SELECT_DROPDOWN_ITEM_SELECTOR = 'div > .ant-select-dropdown > div > .ant-select-dropdown-menu > .ant-select-dropdown-menu-item:nth-child(1)';
exports.REACT_PAGE_OUTSIDE_SELECT1_DROPDOWN_SELECTOR = `div:nth-child(3) > ${exports.REACT_PAGE_OUTSIDE_SELECT_DROPDOWN_ITEM_SELECTOR}`;
exports.REACT_PAGE_OUTSIDE_SELECT2_DROPDOWN_SELECTOR = `div:nth-child(4) > ${exports.REACT_PAGE_OUTSIDE_SELECT_DROPDOWN_ITEM_SELECTOR}`;
exports.REACT_PAGE_FORM_FILE_SELECTOR = `${exports.REACT_PAGE_FORM_SELECTOR} > .ant-form-item:nth-child(10) .ant-form-item-children .ant-upload input`;
exports.REACT_PAGE_CONSOLE_FORM_MESSAGE = 'Received values of form: ';
exports.REACT_PAGE_CONSOLE_FORM_MESSAGE_UPLOAD = 'Upload event:';
exports.REACT_PAGE_UPLOAD_PATH = 'upload.do';
// Resource
exports.RESOURCE_IMAGE_PATH = path.join(__dirname, '../../../test/src/test-image.png');
exports.RESOURCE_PDF_PATH = path.join(__dirname, '../../../test/src/phocapdf-demo2.pdf');
exports.RESOURCE_FILE_NAME_REG = /^\S+[\\/]([^\\/]+\.[^\\/]+)$/;
exports.RESOURCE_FILE_NAME = 'test-image.png';
// puppeteer
// Close sandbox mode
exports.PUPPETEER_LAUNCH_OPTION = {
    args: ['--no-sandbox']
};
exports.PUPPETEER_REACT_LAUNCH_OPTION = {
    args: ['--no-sandbox'],
    slowMo: 20
};
// Request
exports.REQUEST_PATH = 'https://api.github.com/';
// Data
/// mysql
exports.MYSQL_CONFIG = {
    database: 'botphus_test',
    host: '127.0.0.1',
    password: '',
    user: 'travis'
};
exports.MYSQL_TABLE_NAME = 'bp_user';
exports.MYSQL_FIELD_NAME = 'user_name';
exports.MYSQL_FIELD_VALUE = 'Hans Zimmer';
exports.MYSQL_CREATE_TABLE = `
    CREATE TABLE ${exports.MYSQL_TABLE_NAME} (
        id int(11) auto_increment NOT NULL,
        ${exports.MYSQL_FIELD_NAME} varchar(128) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;
exports.MYSQL_INSERT_DATA = `INSERT INTO ${exports.MYSQL_TABLE_NAME} (${exports.MYSQL_FIELD_NAME}) VALUES ("${exports.MYSQL_FIELD_VALUE}")`;
exports.MYSQL_SELECT_DATA = `SELECT * FROM ${exports.MYSQL_TABLE_NAME} WHERE ${exports.MYSQL_FIELD_NAME} = "${exports.MYSQL_FIELD_VALUE}"`;
exports.MYSQL_DROP_TABLE = `DROP TABLE IF EXISTS ${exports.MYSQL_TABLE_NAME}`;
/// redis
exports.REDIS_CONFIG = {
    host: '127.0.0.1',
    port: 6379
};
exports.REDIS_KEY_NAME = 'botphus:test';
exports.REDIS_KEY_VALUE = 'Morgan Freeman';
// Task
exports.TASK_FULL_NAME = 'Full task';
exports.TASK_FULL_LIST = [
    /**
     * Data
     */
    // Mysql
    /// Create Table
    {
        argments: [exports.MYSQL_CREATE_TABLE],
        assertion: ['data'],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: task_1.TaskType.TYPE_DATA
    },
    /// Inset Table
    {
        argments: [exports.MYSQL_INSERT_DATA],
        assertion: ['data'],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: task_1.TaskType.TYPE_DATA
    },
    /// Select Table
    {
        argments: [exports.MYSQL_SELECT_DATA],
        assertion: ['data.length === 1', 'data[0].id === 1', `data[0].${exports.MYSQL_FIELD_NAME} === "${exports.MYSQL_FIELD_VALUE}"`],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: task_1.TaskType.TYPE_DATA
    },
    /// Drop Table
    {
        argments: [exports.MYSQL_DROP_TABLE],
        assertion: ['data'],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: task_1.TaskType.TYPE_DATA
    },
    // Redis
    /// set
    {
        argments: [[['set', exports.REDIS_KEY_NAME, exports.REDIS_KEY_VALUE]]],
        assertion: ['data'],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_REDIS,
        type: task_1.TaskType.TYPE_DATA
    },
    /// get
    {
        argments: [[['get', exports.REDIS_KEY_NAME]]],
        assertion: ['data.length === 1', `data[0][1] === "${exports.REDIS_KEY_VALUE}"`],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_REDIS,
        type: task_1.TaskType.TYPE_DATA
    },
    /// del
    {
        argments: [[['del', exports.REDIS_KEY_NAME]]],
        assertion: ['data'],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_REDIS,
        type: task_1.TaskType.TYPE_DATA
    },
    // goto
    {
        argments: [exports.NORMAL_PAGE_PATH.replace(/\\/g, '\\\\')],
        subType: task_1.TaskTypePageSubType.SUB_TYPE_GOTO,
        type: task_1.TaskType.TYPE_PAGE
    },
    /**
     * Dom
     */
    // click
    {
        argments: [exports.NORMAL_PAGE_SEARCH_SELECTOR],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
        type: task_1.TaskType.TYPE_DOM
    },
    // keyboard
    {
        argments: [exports.NORMAL_PAGE_SEARCH_SELECTOR, exports.SEARCH_SELECTOR_VALUE],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_KEYBOARD,
        type: task_1.TaskType.TYPE_DOM
    },
    // getAttr
    {
        argments: [exports.NORMAL_PAGE_SEARCH_SELECTOR, exports.NORMAL_PAGE_SEARCH_SELECTOR_FIELD],
        assertion: [`data === "${exports.SEARCH_SELECTOR_VALUE}"`],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
        type: task_1.TaskType.TYPE_DOM
    },
    // setAttr
    {
        argments: [exports.NORMAL_PAGE_SEARCH_SELECTOR, exports.NORMAL_PAGE_SEARCH_SELECTOR_FIELD, exports.SEARCH_SELECTOR_VALUE],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_SET_ATTR,
        type: task_1.TaskType.TYPE_DOM
    },
    // getHtml
    {
        argments: [exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === '${exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR_HTML}'`],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_HTML,
        type: task_1.TaskType.TYPE_DOM
    },
    // getText
    {
        argments: [exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === "${exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR_TEXT}"`],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
        type: task_1.TaskType.TYPE_DOM
    },
    // setInputFiles
    {
        argments: [exports.NORMAL_PAGE_FILE_SELECTOR, [exports.RESOURCE_IMAGE_PATH]],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
        type: task_1.TaskType.TYPE_DOM
    },
    // getAttr
    {
        argments: [exports.NORMAL_PAGE_FILE_SELECTOR, exports.NORMAL_PAGE_FILE_SELECTOR_FIELD],
        assertion: ['typeof data === "object"', 'Object.keys(data).length === 1'],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
        type: task_1.TaskType.TYPE_DOM
    },
    /**
     * Event
     */
    // dialog
    {
        argments: [exports.EVENT_TIMEOUT],
        assertion: [`dialog.message() === "${exports.DIALOG_VALUE}"`, 'dialog.type() === "alert"'],
        assertionVarName: 'dialog',
        children: [
            {
                argments: [exports.NORMAL_PAGE_DIALOG_SELECTOR],
                subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                type: task_1.TaskType.TYPE_DOM
            }
        ],
        promptText: 'Botphus',
        subType: task_1.TaskTypeEventSubType.SUB_TYPE_DIALOG,
        type: task_1.TaskType.TYPE_EVENT
    },
    // console
    {
        argments: [exports.EVENT_TIMEOUT],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 1', `consoleMessage.text() === "${exports.CONSOLE_VALUE}"`],
        assertionVarName: 'consoleMessage',
        children: [
            {
                argments: [exports.NORMAL_PAGE_CONSOLE_SELECTOR],
                subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                type: task_1.TaskType.TYPE_DOM
            }
        ],
        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: task_1.TaskType.TYPE_EVENT
    },
    // request & response
    {
        argments: [exports.EVENT_TIMEOUT, (request) => {
                return request.url() === 'https://api.github.com/';
            }],
        assertion: [`request.method() === "GET"`],
        assertionVarName: 'request',
        children: [
            {
                argments: [exports.EVENT_TIMEOUT, (response) => {
                        return response.url() === 'https://api.github.com/';
                    }],
                assertion: ['resData'],
                assertionVarName: 'resData',
                children: [
                    {
                        argments: [exports.NORMAL_PAGE_REQUEST_SELECTOR],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                        type: task_1.TaskType.TYPE_DOM
                    }
                ],
                subType: task_1.TaskTypeEventSubType.SUB_TYPE_RESPONSE,
                type: task_1.TaskType.TYPE_EVENT
            }
        ],
        subType: task_1.TaskTypeEventSubType.SUB_TYPE_REQUEST,
        type: task_1.TaskType.TYPE_EVENT
    },
    /**
     * Time
     */
    {
        argments: [exports.SLEEP_TIME],
        subType: task_1.TaskTypeTimeSubType.SUB_TYPE_SET_SLEEP,
        type: task_1.TaskType.TYPE_TIME
    },
    /**
     * Page
     */
    // setCookie
    {
        argments: [[
                {
                    name: exports.COOKIE_NAME,
                    url: exports.COOKIE_URL,
                    value: exports.COOKIE_VALUE
                }
            ]],
        subType: task_1.TaskTypePageSubType.SUB_TYPE_SET_COOKIE,
        type: task_1.TaskType.TYPE_PAGE
    },
    // reload
    {
        subType: task_1.TaskTypePageSubType.SUB_TYPE_RELOAD,
        type: task_1.TaskType.TYPE_PAGE
    },
    // getCookie
    {
        argments: [[exports.COOKIE_URL]],
        assertion: ['cookies.length === 1', `cookies[0].domain === "${exports.COOKIE_DOMAIN}"`, `cookies[0].name === "${exports.COOKIE_NAME}"`, `cookies[0].value === "${exports.COOKIE_VALUE}"`],
        assertionVarName: 'cookies',
        subType: task_1.TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
        type: task_1.TaskType.TYPE_PAGE
    },
    // deleteCookie
    {
        argments: [[
                {
                    name: exports.COOKIE_NAME,
                    url: exports.COOKIE_URL
                }
            ]],
        subType: task_1.TaskTypePageSubType.SUB_TYPE_DELETE_COOKIE,
        type: task_1.TaskType.TYPE_PAGE
    },
    // getCookie
    {
        argments: [[exports.COOKIE_URL]],
        assertion: ['cookies.length === 0'],
        assertionVarName: 'cookies',
        subType: task_1.TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
        type: task_1.TaskType.TYPE_PAGE
    },
    // goto
    {
        argments: [exports.NORMAL_PAGE_PATH.replace(/\\/g, '\\\\')],
        subType: task_1.TaskTypePageSubType.SUB_TYPE_GOTO,
        type: task_1.TaskType.TYPE_PAGE
    },
    // screenShot
    {
        assertion: ['value instanceof Buffer'],
        assertionVarName: 'value',
        subType: task_1.TaskTypePageSubType.SUB_TYPE_SCREENSHOT,
        type: task_1.TaskType.TYPE_PAGE
    },
];
exports.TASK_REACT_NAME = 'React task';
exports.TASK_REACT_LIST = [
    // console
    {
        argments: [exports.EVENT_TIMEOUT, (consoleMessage) => {
                return consoleMessage.type() === 'log';
            }],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 2', 'consoleMessage.text().indexOf("Upload event:") >= 0'],
        assertionVarName: 'consoleMessage',
        children: [
            {
                argments: [exports.EVENT_TIMEOUT, (request) => {
                        return request.url().indexOf('upload.do') >= 0;
                    }],
                children: [
                    {
                        argments: [exports.REACT_PAGE_FORM_FILE_SELECTOR, [exports.RESOURCE_IMAGE_PATH]],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
                        type: task_1.TaskType.TYPE_DOM
                    }
                ],
                subType: task_1.TaskTypeEventSubType.SUB_TYPE_REQUEST,
                type: task_1.TaskType.TYPE_EVENT
            }
        ],
        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: task_1.TaskType.TYPE_EVENT
    }
];
function countListCase(list) {
    let totalCount = 0;
    list.forEach((rule) => {
        totalCount++;
        if (rule.type === task_1.TaskType.TYPE_EVENT) {
            totalCount = totalCount + countListCase(rule.children);
        }
    });
    return totalCount;
}
exports.TASK_FULL_LIST_CASE_COUNT = countListCase(exports.TASK_FULL_LIST);
exports.TASK_REACT_LIST_CASE_COUNT = countListCase(exports.TASK_REACT_LIST);
