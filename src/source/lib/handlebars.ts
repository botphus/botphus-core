import * as fs from 'fs';
import {compile, registerPartial} from 'handlebars';
import * as path from 'path';
import * as recursive from 'recursive-readdir';

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
function registerPartials(dir: string) {
    recursive(dir, (err, files) => {
        if (err) {
            throw new Error(`Get handlebars partial files error: ${err.message}`);
        }
        files.forEach((filePath) => {
            registerPartial(filePath.replace(/^\S+\\([^\/\\]+).js$/, '$1'), fs.readFileSync(filePath, 'utf8'));
        });
    });
}

/**
 * handlebars template function
 */
export const template = compile(fs.readFileSync(entryFilePath, 'utf8'));
