"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
// value
exports.SEARCH_SELECTOR_VALUE = 'Botphus value';
exports.EVENT_TIMEOUT = 1500;
exports.SLEEP_TIME = 100;
exports.DIALOG_VALUE = 'botphus dialog';
exports.CONSOLE_VALUE = 'botphus console';
exports.COOKIE_NAME = 'botphus';
exports.COOKIE_VALUE = 'botphus cookie value';
exports.COOKIE_URL = 'https://github.com/';
exports.COOKIE_DOMAIN = 'github.com';
// Task cache
exports.CACHE_PATH = path.join(__dirname, '../../../cache/botphus/');
// Normal page
exports.NORMAL_PAGE_PATH = 'file://' + path.join(__dirname, '../../../test/src/normal_test_page.html');
exports.NORMAL_PAGE_SEARCH_SELECTOR = 'form:nth-child(3) > div:nth-child(1) > #search';
exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR = 'form:nth-child(3) > div:nth-child(1)';
exports.NORMAL_PAGE_FILE_SELECTOR = 'form:nth-child(3) > div:nth-child(2) > #file';
exports.NORMAL_PAGE_FILE_MULTI_SELECTOR = 'form:nth-child(3) > div:nth-child(3) > #file-multi';
exports.NORMAL_PAGE_DIALOG_SELECTOR = 'div:nth-child(2) > #dialog';
exports.NORMAL_PAGE_CONSOLE_SELECTOR = 'div:nth-child(2) > #console';
exports.NORMAL_PAGE_REQUEST_SELECTOR = 'div:nth-child(2) > #request';
// Resource
exports.RESOURCE_IMAGE_PATH = path.join(__dirname, '../../../test/src/test-image.png');
exports.RESOURCE_PDF_PATH = path.join(__dirname, '../../../test/src/phocapdf-demo2.pdf');
exports.RESOURCE_FILE_NAME_REG = /^\S+[\\/]([^\\/]+\.[^\\/]+)$/;
// puppeteer
exports.PUPPETEER_LAUNCH_OPTION = { args: ['--no-sandbox'] };
// Request
exports.REQUEST_PATH = 'https://api.github.com/users/baka397';
// Data
/// mysql
exports.MYSQL_CONFIG = {
    database: 'botphus_test',
    host: '127.0.0.1',
    password: '123456',
    user: 'root'
};
exports.MYSQL_TABLE_NAME = 'bp_user';
exports.MYSQL_FIELD_NAME = 'user_name';
exports.MYSQL_FIELD_VALUE = 'Hans Zimmer';
/// redis
exports.REDIS_CONFIG = {
    host: '127.0.0.1',
    port: 6379
};
exports.REDIS_KEY_NAME = 'botphus:test';
exports.REDIS_KEY_VALUE = 'Morgan Freeman';
