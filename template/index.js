const path = require('path');
const puppeteer = require(path.join('{{libPath}}', '/node_modules/puppeteer/'));

// message type
const commonType = require(path.join('{{libPath}}', '/dist/source/types/common'));
const MessageType = commonType.MessageType;

// lib
const commonLib = require(path.join('{{libPath}}', '/dist/source/lib/common'));
const unitLib = require(path.join('{{libPath}}', '/dist/source/lib/unit/')).default;
const mysqlLib = require(path.join('{{libPath}}', '/dist/source/lib/connection/mysql'));
const redisLib = require(path.join('{{libPath}}', '/dist/source/lib/connection/redis'));

// Init process parmas
const puppeteerLaunchOption = process.env.puppeteerLaunchOption;
const mysqlOption = process.env.mysqlOption;
const redisOption = process.env.redisOption;

// Init mysql & redis
let mysqlConnectionNo = '';
let redisConnectionNo = '';
if(mysqlOption) {
    mysqlConnectionNo = mysqlLib.createMysqlConnection(mysqlOption);
}
if(redisOption) {
    redisConnectionNo = redisLib.createRedisConnection(redisOption);
}

/**
 * Send Process message
 * @param  {Array|Error}  message message info
 */
function sendProcessMessage(message) {
    if(process.send) process.send(message);
    else console.log(message);
}

/**
 * End process
 * @param  {puppteer.browser} browser Puppteer Browser instance
 */
function endProcess(browser) {
    if(browser) browser.close();
    if(mysqlConnectionNo) mysqlLib.mysqlConnectionCache[mysqlConnectionNo].end();
    if(redisConnectionNo) redisLib.redisConnectionCache[redisConnectionNo].quit();
}

// Get parent 
puppeteer.launch(puppeteerLaunchOption)
    .then(function(browser) {
        return browser.newPage()
            .then(function(page) {
                return page.goto(process.env.START_PAGE)
                    {{#each taskRules}}
                    {{> entry rule=this }}
                    {{/each}}
            })
            .then(function() {
                endProcess(browser);
            })
            .catch(function(err) {
                sendProcessMessage(commonLib.createErrorMessage(err, MessageType.UNIT_RULE_EXEC_ERROR));
                endProcess(browser);
            });
    })
    .catch(function(err) {
        sendProcessMessage(commonLib.createErrorMessage(err, MessageType.PUPPTER_INIT_ERROR));
        endProcess();
    });