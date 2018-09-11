"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const handlebars_1 = require("handlebars");
const path = require("path");
const recursive = require("recursive-readdir");
// handlebars template path
const tmplDirPath = path.join(__dirname, '../../../template/');
const partialDirPath = path.join(tmplDirPath, 'partials'); // partial dir path
const entryFilePath = path.join(tmplDirPath, 'index.js'); // entry file path
// register partial dir
registerPartials(partialDirPath);
/**
 * Register Partials from dir path
 * @param {string} dir Directory Path
 */
function registerPartials(dir) {
    recursive(dir, (err, files) => {
        if (err) {
            throw new Error(`Get handlebars partial files error: ${err.message}`);
        }
        files.forEach((filePath) => {
            handlebars_1.registerPartial(filePath.replace(/^\S+\\([^\/\\]+).js$/, '$1'), fs.readFileSync(filePath, 'utf8'));
        });
    });
}
/**
 * handlebars template function
 */
exports.template = handlebars_1.compile(fs.readFileSync(entryFilePath, 'utf8'));
