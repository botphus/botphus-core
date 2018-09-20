import {tmpdir} from 'os';
import * as path from 'path';

import {TaskRuleTypeItem, TaskType, TaskTypeDataSubType, TaskTypeDomSubType, TaskTypeEventSubType, TaskTypePageSubType, TaskTypeTimeSubType} from '../../source/types/task';

// value
export const SEARCH_SELECTOR_VALUE = 'Botphus value';
export const EVENT_TIMEOUT = 3000;
export const SLEEP_TIME = 100;
export const DIALOG_VALUE = 'botphus dialog';
export const CONSOLE_VALUE = 'botphus console';
export const COOKIE_NAME = 'botphus';
export const COOKIE_VALUE = 'botphus cookie value';
export const COOKIE_URL = 'https://github.com/';
export const COOKIE_DOMAIN = 'github.com';

// Task cache
export const CACHE_PATH = path.join(tmpdir(), '/botphus/');

// Normal page
export const NORMAL_PAGE_PATH = 'file://' + path.join(__dirname, '../../../test/src/normal_test_page.html');
export const NORMAL_PAGE_SEARCH_SELECTOR = 'form:nth-child(3) > div:nth-child(1) > #search';
export const NORMAL_PAGE_PARENT_SEARCH_SELECTOR = 'form:nth-child(3) > div:nth-child(1)';
export const NORMAL_PAGE_FILE_SELECTOR = 'form:nth-child(3) > div:nth-child(2) > #file';
export const NORMAL_PAGE_FILE_MULTI_SELECTOR = 'form:nth-child(3) > div:nth-child(3) > #file-multi';
export const NORMAL_PAGE_DIALOG_SELECTOR = 'div:nth-child(2) > #dialog';
export const NORMAL_PAGE_CONSOLE_SELECTOR = 'div:nth-child(2) > #console';
export const NORMAL_PAGE_REQUEST_SELECTOR = 'div:nth-child(2) > #request';
export const NORMAL_PAGE_SEARCH_SELECTOR_FIELD = 'value';
export const NORMAL_PAGE_FILE_SELECTOR_FIELD = 'files';
export const NORMAL_PAGE_PARENT_SEARCH_SELECTOR_HTML = '<label for="search">搜索名称</label><input type="text" name="search" id="search">';
export const NORMAL_PAGE_PARENT_SEARCH_SELECTOR_TEXT = '搜索名称';

// Resource
export const RESOURCE_IMAGE_PATH = path.join(__dirname, '../../../test/src/test-image.png');
export const RESOURCE_PDF_PATH = path.join(__dirname, '../../../test/src/phocapdf-demo2.pdf');
export const RESOURCE_FILE_NAME_REG = /^\S+[\\/]([^\\/]+\.[^\\/]+)$/;

// puppeteer
export const PUPPETEER_LAUNCH_OPTION = {args: ['--no-sandbox']};

// Request
export const REQUEST_PATH = 'https://api.github.com/';

// Data
/// mysql
export const MYSQL_CONFIG = {
    database: 'botphus_test',
    host: '127.0.0.1',
    password: '',
    user: 'travis'
};
export const MYSQL_TABLE_NAME = 'bp_user';
export const MYSQL_FIELD_NAME = 'user_name';
export const MYSQL_FIELD_VALUE = 'Hans Zimmer';
export const MYSQL_CREATE_TABLE = `
    CREATE TABLE ${MYSQL_TABLE_NAME} (
        id int(11) auto_increment NOT NULL,
        ${MYSQL_FIELD_NAME} varchar(128) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;
export const MYSQL_INSERT_DATA = `INSERT INTO ${MYSQL_TABLE_NAME} (${MYSQL_FIELD_NAME}) VALUES ("${MYSQL_FIELD_VALUE}")`;
export const MYSQL_SELECT_DATA = `SELECT * FROM ${MYSQL_TABLE_NAME} WHERE ${MYSQL_FIELD_NAME} = "${MYSQL_FIELD_VALUE}"`;
export const MYSQL_DROP_TABLE = `DROP TABLE IF EXISTS ${MYSQL_TABLE_NAME}`;

/// redis
export const REDIS_CONFIG = {
  host: '127.0.0.1',
  port: 6379
};

export const REDIS_KEY_NAME = 'botphus:test';
export const REDIS_KEY_VALUE = 'Morgan Freeman';

// Task
export const TASK_FULL_NAME = 'Full task';
export const TASK_FULL_LIST: TaskRuleTypeItem[] = [
    /**
     * Data
     */
    // Mysql
    /// Create Table
    {
        argments: [MYSQL_CREATE_TABLE],
        assertion: ['data'],
        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: TaskType.TYPE_DATA
    },
    /// Inset Table
    {
        argments: [MYSQL_INSERT_DATA],
        assertion: ['data'],
        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: TaskType.TYPE_DATA
    },
    /// Select Table
    {
        argments: [MYSQL_SELECT_DATA],
        assertion: ['data.length === 1', 'data[0].id === 1', `data[0].${MYSQL_FIELD_NAME} === "${MYSQL_FIELD_VALUE}"`],
        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: TaskType.TYPE_DATA
    },
    /// Drop Table
    {
        argments: [MYSQL_DROP_TABLE],
        assertion: ['data'],
        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: TaskType.TYPE_DATA
    },
    // Redis
    /// set
    {
        argments: [[['set', REDIS_KEY_NAME, REDIS_KEY_VALUE]]],
        assertion: ['data'],
        subType: TaskTypeDataSubType.SUB_TYPE_REDIS,
        type: TaskType.TYPE_DATA
    },
    /// get
    {
        argments: [[['get', REDIS_KEY_NAME]]],
        assertion: ['data.length === 1', `data[0][1] === "${REDIS_KEY_VALUE}"`],
        subType: TaskTypeDataSubType.SUB_TYPE_REDIS,
        type: TaskType.TYPE_DATA
    },
    /// del
    {
        argments: [[['del', REDIS_KEY_NAME]]],
        assertion: ['data'],
        subType: TaskTypeDataSubType.SUB_TYPE_REDIS,
        type: TaskType.TYPE_DATA
    },
    // goto
    {
        argments: [NORMAL_PAGE_PATH.replace(/\\/g, '\\\\')],
        subType: TaskTypePageSubType.SUB_TYPE_GOTO,
        type: TaskType.TYPE_PAGE
    },
    /**
     * Dom
     */
    // click
    {
        argments: [NORMAL_PAGE_SEARCH_SELECTOR],
        subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
        type: TaskType.TYPE_DOM
    },
    // keyboard
    {
        argments: [NORMAL_PAGE_SEARCH_SELECTOR, SEARCH_SELECTOR_VALUE],
        subType: TaskTypeDomSubType.SUB_TYPE_KEYBOARD,
        type: TaskType.TYPE_DOM
    },
    // getAttr
    {
        argments: [NORMAL_PAGE_SEARCH_SELECTOR, NORMAL_PAGE_SEARCH_SELECTOR_FIELD],
        assertion: [`data === "${SEARCH_SELECTOR_VALUE}"`],
        subType: TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
        type: TaskType.TYPE_DOM
    },
    // setAttr
    {
        argments: [NORMAL_PAGE_SEARCH_SELECTOR, NORMAL_PAGE_SEARCH_SELECTOR_FIELD, SEARCH_SELECTOR_VALUE],
        subType: TaskTypeDomSubType.SUB_TYPE_SET_ATTR,
        type: TaskType.TYPE_DOM
    },
    // getHtml
    {
        argments: [NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === '${NORMAL_PAGE_PARENT_SEARCH_SELECTOR_HTML}'`],
        subType: TaskTypeDomSubType.SUB_TYPE_GET_HTML,
        type: TaskType.TYPE_DOM
    },
    // getText
    {
        argments: [NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === "${NORMAL_PAGE_PARENT_SEARCH_SELECTOR_TEXT}"`],
        subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
        type: TaskType.TYPE_DOM
    },
    // setInputFiles
    {
        argments: [NORMAL_PAGE_FILE_SELECTOR, [RESOURCE_IMAGE_PATH]],
        subType: TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
        type: TaskType.TYPE_DOM
    },
    // getAttr
    {
        argments: [NORMAL_PAGE_FILE_SELECTOR, NORMAL_PAGE_FILE_SELECTOR_FIELD],
        assertion: ['typeof data === "object"', 'Object.keys(data).length === 1'],
        subType: TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
        type: TaskType.TYPE_DOM
    },
    /**
     * Event
     */
    // dialog
    {
        argments: [EVENT_TIMEOUT],
        assertion: [`dialog.message() === "${DIALOG_VALUE}"`, 'dialog.type() === "alert"'],
        assertionVarName: 'dialog',
        children: [
            {
                argments: [NORMAL_PAGE_DIALOG_SELECTOR],
                subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                type: TaskType.TYPE_DOM
            }
        ],
        promptText: 'Botphus',
        subType: TaskTypeEventSubType.SUB_TYPE_DIALOG,
        type: TaskType.TYPE_EVENT
    },
    // console
    {
        argments: [EVENT_TIMEOUT],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 1', `consoleMessage.text() === "${CONSOLE_VALUE}"`],
        assertionVarName: 'consoleMessage',
        children: [
            {
                argments: [NORMAL_PAGE_CONSOLE_SELECTOR],
                subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                type: TaskType.TYPE_DOM
            }
        ],
        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: TaskType.TYPE_EVENT
    },
    // request & response
    {
        argments: [EVENT_TIMEOUT],
        assertion: [`request.method() === "GET"`],
        assertionVarName: 'request',
        children: [
            {
                argments: [EVENT_TIMEOUT],
                assertion: ['resData'],
                assertionVarName: 'resData',
                children: [
                    {
                        argments: [NORMAL_PAGE_REQUEST_SELECTOR],
                        subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                        type: TaskType.TYPE_DOM
                    }
                ],
                subType: TaskTypeEventSubType.SUB_TYPE_RESPONSE,
                type: TaskType.TYPE_EVENT
            }
        ],
        subType: TaskTypeEventSubType.SUB_TYPE_REQUEST,
        type: TaskType.TYPE_EVENT
    },
    /**
     * Time
     */
    {
        argments: [SLEEP_TIME],
        subType: TaskTypeTimeSubType.SUB_TYPE_SET_SLEEP,
        type: TaskType.TYPE_TIME
    },
    /**
     * Page
     */
    // setCookie
    {
        argments: [[
            {
                name: COOKIE_NAME,
                url: COOKIE_URL,
                value: COOKIE_VALUE
            }
        ]],
        subType: TaskTypePageSubType.SUB_TYPE_SET_COOKIE,
        type: TaskType.TYPE_PAGE
    },
    // reload
    {
        subType: TaskTypePageSubType.SUB_TYPE_RELOAD,
        type: TaskType.TYPE_PAGE
    },
    // getCookie
    {
        argments: [[COOKIE_URL]],
        assertion: ['cookies.length === 1', `cookies[0].domain === "${COOKIE_DOMAIN}"`, `cookies[0].name === "${COOKIE_NAME}"`, `cookies[0].value === "${COOKIE_VALUE}"`],
        assertionVarName: 'cookies',
        subType: TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
        type: TaskType.TYPE_PAGE
    },
    // deleteCookie
    {
        argments: [[
            {
                name: COOKIE_NAME,
                url: COOKIE_URL
            }
        ]],
        subType: TaskTypePageSubType.SUB_TYPE_DELETE_COOKIE,
        type: TaskType.TYPE_PAGE
    },
    // getCookie
    {
        argments: [[COOKIE_URL]],
        assertion: ['cookies.length === 0'],
        assertionVarName: 'cookies',
        subType: TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
        type: TaskType.TYPE_PAGE
    },
    // goto
    {
        argments: [NORMAL_PAGE_PATH.replace(/\\/g, '\\\\')],
        subType: TaskTypePageSubType.SUB_TYPE_GOTO,
        type: TaskType.TYPE_PAGE
    },
    // screenShot
    {
        assertion: ['value instanceof Buffer'],
        assertionVarName: 'value',
        subType: TaskTypePageSubType.SUB_TYPE_SCREENSHOT,
        type: TaskType.TYPE_PAGE
    },
];

let taskCaseCount = 0;
function countFullList(list: TaskRuleTypeItem[]) {
    list.forEach((rule: TaskRuleTypeItem) => {
        taskCaseCount++;
        if (rule.type === TaskType.TYPE_EVENT) {
            countFullList(rule.children);
        }
    });
}
countFullList(TASK_FULL_LIST);
export const TASK_FULL_LIST_CASE_COUNT = taskCaseCount;
