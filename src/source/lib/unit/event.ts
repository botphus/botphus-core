import * as puppeteer from 'puppeteer';

/**
 * Dialog listener
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-event-dialog
 * @param  {puppeteer.Page}            page      Current Page
 * @param  {number}                    timeout   timeout, millisecond
 * @param  {()=>Promise<any>}          childFunc Child functions after listener created
 * @param  {any)=>boolean}             checkFunc Check if info is right
 * @return {Promise<puppeteer.Dialog>}           Return info
 */
export function dialog(page: puppeteer.Page, timeout: number, childFunc: () => Promise<any>, checkFunc?: (info: any) => boolean): Promise<puppeteer.Dialog> {
    return eventListener<puppeteer.Dialog>(page, 'dialog', timeout, childFunc, checkFunc);
}

/**
 * Console listener
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-event-console
 * @param  {puppeteer.Page}                    page      Current Page
 * @param  {number}                            timeout   timeout, millisecond
 * @param  {()=>Promise<any>}                  childFunc Child functions after listener created
 * @param  {any)=>boolean}                     checkFunc Check if info is right
 * @return {Promise<puppeteer.ConsoleMessage>}           Return info
 */
export function console(page: puppeteer.Page, timeout: number, childFunc: () => Promise<any>, checkFunc?: (info: any) => boolean): Promise<puppeteer.ConsoleMessage> {
    return eventListener<puppeteer.ConsoleMessage>(page, 'console', timeout, childFunc, checkFunc);
}

/**
 * Request listener
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-event-request
 * @param  {puppeteer.Page}             page      Current Page
 * @param  {number}                     timeout   timeout, millisecond
 * @param  {()=>Promise<any>}           childFunc Child functions after listener created
 * @param  {any)=>boolean}              checkFunc Check if info is right
 * @return {Promise<puppeteer.Request>}           Return info
 */
export function request(page: puppeteer.Page, timeout: number, childFunc: () => Promise<any>, checkFunc?: (info: any) => boolean): Promise<puppeteer.Request> {
    return eventListener<puppeteer.Request>(page, 'request', timeout, childFunc, checkFunc);
}

/**
 * Response listener
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-event-response
 * @param  {puppeteer.Page}              page      Current Page
 * @param  {number}                      timeout   timeout, millisecond
 * @param  {()=>Promise<any>}            childFunc Child functions after listener created
 * @param  {any)=>boolean}               checkFunc Check if info is right
 * @return {Promise<puppeteer.Response>}           Return info
 */
export function response(page: puppeteer.Page, timeout: number, childFunc: () => Promise<any>, checkFunc?: (info: any) => boolean): Promise<puppeteer.Response> {
    return eventListener<puppeteer.Response>(page, 'response', timeout, childFunc, checkFunc);
}

/**
 * Common event listener
 * @param  {puppeteer.Page}       page      Current Page
 * @param  {puppeteer.PageEvents} eventName Event Name
 * @param  {number}               timeout   timeout, millisecond
 * @param  {()=>Promise<any>}     childFunc Child functions after listener created
 * @param  {any)=>boolean}        checkFunc Check if info is right
 * @return {Promise<T>}                     Return info
 */
function eventListener<T>(page: puppeteer.Page, eventName: puppeteer.PageEvents, timeout: number, childFunc: () => Promise<any>, checkFunc?: (info: any) => boolean): Promise<T> {
    return new Promise((resolve, reject) => {
        // Create a timer for timeout
        let timer = setTimeout(() => {
            reject(new Error(`Event "${eventName}" listener timeout`));
            timer = null;
            removeTimer();
        }, timeout);
        // Register a listener
        page.on(eventName, curEventListener);
        function curEventListener(info: any) {
            // For timeout
            if (!timer) {
                return;
            }
            // Check info is right when checkFunc exist
            if (checkFunc && !checkFunc(info)) {
                return;
            }
            removeTimer();
            resolve(info);
        }
        function removeTimer() {
            if (timer) {
                // Clear timer
                clearTimeout(timer);
                timer = null;
            }
            // Remove listener
            page.removeListener(eventName, curEventListener);
        }
        // Run & trigger listener
        childFunc()
            .catch((err) => {
                removeTimer();
                reject(err);
            });
    });
}
