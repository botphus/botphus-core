import {tmpdir} from 'os';
import * as path from 'path';

import {RuleTypeItem, Type, TypeDataSubType, TypeDomSubType, TypeEventSubType, TypePageSubType, TypeTimeSubType} from '../../source/types/task';

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
export const TASK_FULL_LIST: RuleTypeItem[] = [
    /**
     * Data
     */
    // Mysql
    /// Create Table
    {
        argments: [MYSQL_CREATE_TABLE],
        assertion: ['!data'],
        subType: TypeDataSubType.SUB_TYPE_MYSQL,
        type: Type.TYPE_DATA
    },
    /// Inset Table
    {
        argments: [MYSQL_INSERT_DATA],
        assertion: ['!data'],
        subType: TypeDataSubType.SUB_TYPE_MYSQL,
        type: Type.TYPE_DATA
    },
    /// Select Table
    {
        argments: [MYSQL_SELECT_DATA],
        assertion: ['data.length === 1', 'data[0].id === 1', `data[0][${MYSQL_FIELD_NAME}] === "${MYSQL_FIELD_VALUE}"`],
        subType: TypeDataSubType.SUB_TYPE_MYSQL,
        type: Type.TYPE_DATA
    },
    /// Drop Table
    {
        argments: [MYSQL_DROP_TABLE],
        assertion: ['!data'],
        subType: TypeDataSubType.SUB_TYPE_MYSQL,
        type: Type.TYPE_DATA
    },
    // Redis
    /// set
    {
        argments: [[['set', REDIS_KEY_NAME, REDIS_KEY_VALUE]]],
        assertion: ['!data'],
        subType: TypeDataSubType.SUB_TYPE_REDIS,
        type: Type.TYPE_DATA
    },
    /// get
    {
        argments: [[['get', REDIS_KEY_NAME]]],
        assertion: ['data.length === 1', `data[0][1] === "${REDIS_KEY_VALUE}"`],
        subType: TypeDataSubType.SUB_TYPE_REDIS,
        type: Type.TYPE_DATA
    },
    /// del
    {
        argments: [[['del', REDIS_KEY_NAME]]],
        assertion: ['!data'],
        subType: TypeDataSubType.SUB_TYPE_REDIS,
        type: Type.TYPE_DATA
    },
    /**
     * Dom
     */
    // click
    {
        argments: [NORMAL_PAGE_SEARCH_SELECTOR],
        subType: TypeDomSubType.SUB_TYPE_CLICK,
        type: Type.TYPE_DOM
    },
    // keyboard
    {
        argments: [NORMAL_PAGE_SEARCH_SELECTOR, SEARCH_SELECTOR_VALUE],
        subType: TypeDomSubType.SUB_TYPE_KEYBOARD,
        type: Type.TYPE_DOM
    },
    // getAttr
    {
        argments: [NORMAL_PAGE_SEARCH_SELECTOR, NORMAL_PAGE_SEARCH_SELECTOR_FIELD],
        assertion: [`data === "${SEARCH_SELECTOR_VALUE}"`],
        subType: TypeDomSubType.SUB_TYPE_GET_ATTR,
        type: Type.TYPE_DOM
    },
    // setAttr
    {
        argments: [NORMAL_PAGE_SEARCH_SELECTOR, NORMAL_PAGE_SEARCH_SELECTOR_FIELD, SEARCH_SELECTOR_VALUE],
        subType: TypeDomSubType.SUB_TYPE_SET_ATTR,
        type: Type.TYPE_DOM
    },
    // getHtml
    {
        argments: [NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === '${NORMAL_PAGE_PARENT_SEARCH_SELECTOR_HTML}'`],
        subType: TypeDomSubType.SUB_TYPE_GET_HTML,
        type: Type.TYPE_DOM
    },
    // getText
    {
        argments: [NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === "${NORMAL_PAGE_PARENT_SEARCH_SELECTOR_TEXT}"`],
        subType: TypeDomSubType.SUB_TYPE_GET_TEXT,
        type: Type.TYPE_DOM
    },
    // setInputFiles
    {
        argments: [NORMAL_PAGE_FILE_SELECTOR, [RESOURCE_IMAGE_PATH]],
        assertion: ['typeof data === "object"', 'Object.keys(data).length === 1'],
        subType: TypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
        type: Type.TYPE_DOM
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
                subType: TypeDomSubType.SUB_TYPE_CLICK,
                type: Type.TYPE_DOM
            }
        ],
        promptText: 'Botphus',
        subType: TypeEventSubType.SUB_TYPE_DIALOG,
        type: Type.TYPE_EVENT
    },
    // console
    {
        argments: [EVENT_TIMEOUT],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 1', `consoleMessage.text() === "${CONSOLE_VALUE}"`],
        assertionVarName: 'consoleMessage',
        children: [
            {
                argments: [NORMAL_PAGE_CONSOLE_SELECTOR],
                subType: TypeDomSubType.SUB_TYPE_CLICK,
                type: Type.TYPE_DOM
            }
        ],
        subType: TypeEventSubType.SUB_TYPE_CONSOLE,
        type: Type.TYPE_EVENT
    },
    // request & response
    {
        argments: [EVENT_TIMEOUT, (request: any) => {
            return request.url() === 'https://api.github.com/';
        }],
        assertion: [`request.method() === "GET"`],
        children: [
            {
                argments: [EVENT_TIMEOUT, (response: any) => {
                    return response.url() === 'https://api.github.com/';
                }],
                assertion: ['resData'],
                assertionVarName: 'resData',
                children: [
                    {
                        argments: [NORMAL_PAGE_REQUEST_SELECTOR],
                        subType: TypeDomSubType.SUB_TYPE_CLICK,
                        type: Type.TYPE_DOM
                    }
                ],
                subType: TypeEventSubType.SUB_TYPE_RESPONSE,
                type: Type.TYPE_EVENT
            }
        ],
        subType: TypeEventSubType.SUB_TYPE_REQUEST,
        type: Type.TYPE_EVENT
    },
    /**
     * Time
     */
    {
        argments: [SLEEP_TIME],
        subType: TypeTimeSubType.SUB_TYPE_SET_SLEEP,
        type: Type.TYPE_TIME
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
        subType: TypePageSubType.SUB_TYPE_SET_COOKIE,
        type: Type.TYPE_PAGE
    },
    // reload
    {
        subType: TypePageSubType.SUB_TYPE_RELOAD,
        type: Type.TYPE_PAGE
    },
    // getCookie
    {
        argments: [[COOKIE_URL]],
        assertion: ['cookies.length === 1', `cookies[0].domain === "${COOKIE_DOMAIN}"`, `cookies[0].name === "${COOKIE_NAME}"`, `cookies[0].value === "${COOKIE_VALUE}"`],
        assertionVarName: 'cookies',
        subType: TypePageSubType.SUB_TYPE_GET_COOKIE,
        type: Type.TYPE_PAGE
    },
    // deleteCookie
    {
        argments: [[
            {
                name: COOKIE_NAME,
                url: COOKIE_URL
            }
        ]],
        subType: TypePageSubType.SUB_TYPE_DELETE_COOKIE,
        type: Type.TYPE_PAGE
    },
    // getCookie
    {
        argments: [[COOKIE_URL]],
        assertion: ['cookies.length === 0'],
        assertionVarName: 'cookies',
        subType: TypePageSubType.SUB_TYPE_GET_COOKIE,
        type: Type.TYPE_PAGE
    },
    // goto
    {
        argments: [NORMAL_PAGE_PATH.replace(/\\/g, '\\\\')],
        subType: TypePageSubType.SUB_TYPE_GOTO,
        type: Type.TYPE_PAGE
    },
    // screenShot
    {
        assertion: ['value instanceof Buffer'],
        assertionVarName: 'value',
        subType: TypePageSubType.SUB_TYPE_SCREENSHOT,
        type: Type.TYPE_PAGE
    },
];
