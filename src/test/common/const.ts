import * as path from 'path';

// value
export const SEARCH_SELECTOR_VALUE = 'Botphus value';
export const EVENT_TIMEOUT = 1500;
export const SLEEP_TIME = 100;
export const DIALOG_VALUE = 'botphus dialog';
export const CONSOLE_VALUE = 'botphus console';
export const COOKIE_NAME = 'botphus';
export const COOKIE_VALUE = 'botphus cookie value';
export const COOKIE_URL = 'https://github.com/';
export const COOKIE_DOMAIN = 'github.com';

// Task cache
export const CACHE_PATH = path.join(__dirname, '../../../cache/botphus/');

// Normal page
export const NORMAL_PAGE_PATH = 'file://' + path.join(__dirname, '../../../test/src/normal_test_page.html');
export const NORMAL_PAGE_SEARCH_SELECTOR = 'form:nth-child(3) > div:nth-child(1) > #search';
export const NORMAL_PAGE_PARENT_SEARCH_SELECTOR = 'form:nth-child(3) > div:nth-child(1)';
export const NORMAL_PAGE_FILE_SELECTOR = 'form:nth-child(3) > div:nth-child(2) > #file';
export const NORMAL_PAGE_FILE_MULTI_SELECTOR = 'form:nth-child(3) > div:nth-child(3) > #file-multi';
export const NORMAL_PAGE_DIALOG_SELECTOR = 'div:nth-child(2) > #dialog';
export const NORMAL_PAGE_CONSOLE_SELECTOR = 'div:nth-child(2) > #console';
export const NORMAL_PAGE_REQUEST_SELECTOR = 'div:nth-child(2) > #request';

// Resource
export const RESOURCE_IMAGE_PATH = path.join(__dirname, '../../../test/src/test-image.png');
export const RESOURCE_PDF_PATH = path.join(__dirname, '../../../test/src/phocapdf-demo2.pdf');
export const RESOURCE_FILE_NAME_REG = /^\S+[\\/]([^\\/]+\.[^\\/]+)$/;

// puppeteer
export const PUPPETEER_LAUNCH_OPTION = {args: ['--no-sandbox']};

// Request
export const REQUEST_PATH = 'https://api.github.com/users/baka397';

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

/// redis
export const REDIS_CONFIG = {
  host: '127.0.0.1',
  port: 6379
};
export const REDIS_KEY_NAME = 'botphus:test';
export const REDIS_KEY_VALUE = 'Morgan Freeman';
