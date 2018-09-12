import * as fs from 'fs';
import {compile, registerPartial} from 'handlebars';
import * as path from 'path';
import * as recursive from 'recursive-readdir';

// handlebars template path
const tmplDirPath = path.join(__dirname, '../../../template/');
const partialDirPath = path.join(tmplDirPath, 'partials'); // partial dir path
const entryFilePath = path.join(tmplDirPath, 'index.js'); // entry file path

let templateCache: Handlebars.TemplateDelegate;

/**
 * Register Partials from dir path
 * @param {string} dir Directory Path
 */
/**
 * Register Partials from dir path
 * @param  {string}        dir Directory Path
 * @return {Promise<void>}     Promise
 */
function registerPartials(dir: string): Promise<void> {
    return recursive(dir)
        .then((files) => {
            files.forEach((filePath) => {
                registerPartial(filePath.replace(/^\S+\\([^\/\\]+).js$/, '$1'), fs.readFileSync(filePath, 'utf8'));
            });
        });
}

/**
 * handlebars template function
 * @return {Promise<Handlebars.TemplateDelegate>} Template function promise
 */
export function template(): Promise<Handlebars.TemplateDelegate> {
    // if has cache return;
    if (templateCache) {
        return Promise.resolve(templateCache);
    }
    // else compile template;
    return registerPartials(partialDirPath)
        .then(() => {
            templateCache = compile(fs.readFileSync(entryFilePath, 'utf8'));
            return Promise.resolve(templateCache);
        });
}
