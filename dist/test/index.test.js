"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const func_1 = require("./func/");
const task_1 = require("./task/");
const unit_1 = require("./unit/");
describe('Parse', () => {
    // Common func
    func_1.default();
    // Test Task
    task_1.default();
    // Test Unit
    unit_1.default();
});
