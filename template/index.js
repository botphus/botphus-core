const path = require('path');
const puppeteer = require(path.join('{{libPath}}', '/node_modules/puppeteer/'));

// message type
const commonType = require(path.join('{{libPath}}', '/dist/source/types/common'));
const MessageType = commonType.MessageType;

// lib
const commonLib = require(path.join('{{libPath}}', '/dist/source/lib/common'));
const unitLib = require(path.join('{{libPath}}', '/dist/source/lib/unit/')).default;

// Init process parmas
const puppeteerLaunchOption = process.env.puppeteerLaunchOption;

/**
 * Send Process message
 * @param  {Array|Error}  message message info
 */
function sendProcessMessage(message) {
    if(process.send) process.send(message);
    else console.log(message);
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
                browser.close();
            })
            .catch(function(err) {
                browser.close();
                sendProcessMessage(commonLib.createErrorMessage(err, MessageType.UNIT_RULE_EXEC_ERROR));
            });
    })
    .catch(function(err) {
        sendProcessMessage(commonLib.createErrorMessage(err, MessageType.PUPPTER_INIT_ERROR));
    });