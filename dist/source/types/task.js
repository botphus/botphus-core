"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Task Type
 */
var Type;
(function (Type) {
    Type[Type["TYPE_DATA"] = 1] = "TYPE_DATA";
    Type[Type["TYPE_DOM"] = 2] = "TYPE_DOM";
    Type[Type["TYPE_EVENT"] = 3] = "TYPE_EVENT";
    Type[Type["TYPE_TIME"] = 4] = "TYPE_TIME";
    Type[Type["TYPE_PAGE"] = 5] = "TYPE_PAGE";
})(Type = exports.Type || (exports.Type = {}));
// Task sub type
/**
 * Sub type: Data
 */
var TypeDataSubType;
(function (TypeDataSubType) {
    TypeDataSubType[TypeDataSubType["SUB_TYPE_MYSQL"] = 100] = "SUB_TYPE_MYSQL";
    TypeDataSubType[TypeDataSubType["SUB_TYPE_REDIS"] = 101] = "SUB_TYPE_REDIS";
})(TypeDataSubType = exports.TypeDataSubType || (exports.TypeDataSubType = {}));
/**
 * Sub type: Dom
 */
var TypeDomSubType;
(function (TypeDomSubType) {
    TypeDomSubType[TypeDomSubType["SUB_TYPE_KEYBOARD"] = 200] = "SUB_TYPE_KEYBOARD";
    TypeDomSubType[TypeDomSubType["SUB_TYPE_SET_ATTR"] = 201] = "SUB_TYPE_SET_ATTR";
    TypeDomSubType[TypeDomSubType["SUB_TYPE_GET_ATTR"] = 202] = "SUB_TYPE_GET_ATTR";
    TypeDomSubType[TypeDomSubType["SUB_TYPE_GET_HTML"] = 203] = "SUB_TYPE_GET_HTML";
    TypeDomSubType[TypeDomSubType["SUB_TYPE_GET_TEXT"] = 204] = "SUB_TYPE_GET_TEXT";
    TypeDomSubType[TypeDomSubType["SUB_TYPE_CLICK"] = 205] = "SUB_TYPE_CLICK";
    TypeDomSubType[TypeDomSubType["SUB_TYPE_SET_INPUT_FILES"] = 206] = "SUB_TYPE_SET_INPUT_FILES";
})(TypeDomSubType = exports.TypeDomSubType || (exports.TypeDomSubType = {}));
/**
 * Sub type: Event
 */
var TypeEventSubType;
(function (TypeEventSubType) {
    TypeEventSubType[TypeEventSubType["SUB_TYPE_REQUEST"] = 300] = "SUB_TYPE_REQUEST";
    TypeEventSubType[TypeEventSubType["SUB_TYPE_RESPONSE"] = 301] = "SUB_TYPE_RESPONSE";
    TypeEventSubType[TypeEventSubType["SUB_TYPE_CONSOLE"] = 302] = "SUB_TYPE_CONSOLE";
    TypeEventSubType[TypeEventSubType["SUB_TYPE_DIALOG"] = 303] = "SUB_TYPE_DIALOG";
})(TypeEventSubType = exports.TypeEventSubType || (exports.TypeEventSubType = {}));
/**
 * Sub type: Time
 */
var TypeTimeSubType;
(function (TypeTimeSubType) {
    TypeTimeSubType[TypeTimeSubType["SUB_TYPE_SET_SLEEP"] = 400] = "SUB_TYPE_SET_SLEEP";
})(TypeTimeSubType = exports.TypeTimeSubType || (exports.TypeTimeSubType = {}));
/**
 * Sub type: Page
 */
var TypePageSubType;
(function (TypePageSubType) {
    TypePageSubType[TypePageSubType["SUB_TYPE_RELOAD"] = 500] = "SUB_TYPE_RELOAD";
    TypePageSubType[TypePageSubType["SUB_TYPE_SET_COOKIE"] = 501] = "SUB_TYPE_SET_COOKIE";
    TypePageSubType[TypePageSubType["SUB_TYPE_GET_COOKIE"] = 502] = "SUB_TYPE_GET_COOKIE";
    TypePageSubType[TypePageSubType["SUB_TYPE_DELETE_COOKIE"] = 503] = "SUB_TYPE_DELETE_COOKIE";
    TypePageSubType[TypePageSubType["SUB_TYPE_GOTO"] = 504] = "SUB_TYPE_GOTO";
    TypePageSubType[TypePageSubType["SUB_TYPE_SCREENSHOT"] = 505] = "SUB_TYPE_SCREENSHOT";
})(TypePageSubType = exports.TypePageSubType || (exports.TypePageSubType = {}));
