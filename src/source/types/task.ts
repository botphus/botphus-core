import {IDataRuleItem, IDomRuleItem, IEventRuleItem, IPageRuleItem, ITimeRuleItem} from '../interfaces/task';

/**
 * Combine different rule item to one
 * @type {Object}
 */
export type RuleTypeItem = IDataRuleItem | IDomRuleItem | IEventRuleItem | ITimeRuleItem | IPageRuleItem;

/**
 * Task Type
 */
export enum Type {
    TYPE_DATA = 1, // 数据类
    TYPE_DOM = 2, // 数量类
    TYPE_EVENT = 3, // 事件类
    TYPE_TIME = 4, // 时间类
    TYPE_PAGE = 5, // 页面类
}

// Task sub type
/**
 * Sub type: Data
 */
export enum TypeDataSubType {
    SUB_TYPE_MYSQL = 100, // MySQL
    SUB_TYPE_REDIS = 101, // Redis
}

/**
 * Sub type: Dom
 */
export enum TypeDomSubType {
    SUB_TYPE_KEYBOARD = 200, // 键盘处理
    SUB_TYPE_SET_ATTR = 201, // 设置属性
    SUB_TYPE_GET_ATTR = 202, // 获取属性
    SUB_TYPE_GET_HTML = 203, // 获取HTML内容
    SUB_TYPE_CLICK = 204, // 点击
}

/**
 * Sub type: Event
 */
export enum TypeEventSubType {
    SUB_TYPE_REQUEST = 300, // 监听发送请求
    SUB_TYPE_RESPONSE = 301, // 监听返回请求
    SUB_TYPE_CONSOLE = 302, // 控制台打印
    SUB_TYPE_DIALOG = 303, // 弹窗
}

/**
 * Sub type: Time
 */
export enum TypeTimeSubType {
    SUB_TYPE_SET_TIMEOUT = 400, // 设置延时
}

/**
 * Sub type: Page
 */
export enum TypePageSubType {
    SUB_TYPE_RELOAD = 500, // 刷新页面
    SUB_TYPE_SET_COOKIE = 501, // 插入cookie
    SUB_TYPE_GET_COOKIE = 502, // 获取cookie
    SUB_TYPE_DELETE_COOKIE = 503, // 删除cookie
    SUB_TYPE_GOTO = 504, // 跳转至新页面
    SUB_TYPE_SCREENSHOT = 505, // 截屏
}
