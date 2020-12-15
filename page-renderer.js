/*!
 * Matomo - free/libre analytics platform
 *
 * PageRenderer class for screenshot tests.
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

const urlModule = require('url');
const util = require('util');
const { EventEmitter } = require('events');

const parseUrl = urlModule.parse,
    formatUrl = urlModule.format;

const AJAX_IDLE_THRESHOLD = 500; // same as networkIdle event
const VERBOSE = true;
const PAGE_METHODS_TO_PROXY = [
    '$',
    '$$',
    '$$eval',
    '$eval',
    '$x',
    'bringToFront',
    'click',
    'content',
    'cookies',
    'coverage',
    'deleteCookie',
    'evaluate',
    'evaluateHandle',
    'evaluateOnNewDocument',
    'exposeFunction',
    'focus',
    'frames',
    'goBack',
    'goForward',
    'goto',
    'hover',
    'mainFrame',
    'metrics',
    'queryObjects',
    'reload',
    'screenshot',
    'select',
    'setBypassCSP',
    'setCacheEnabled',
    'setContent',
    'setExtraHTTPHeaders',
    'setUserAgent',
    'tap',
    'target',
    'title',
    'type',
    'url',
    'viewport',
    'waitFor',
    'waitForFunction',
    'waitForNavigation',
    'waitForSelector',
    'waitForXPath',
];

const PAGE_PROPERTIES_TO_PROXY = [
    'mouse',
    'keyboard',
    'touchscreen',
];

const AUTO_WAIT_METHODS = {// TODO: remove this to keep it consistent?
    'goBack': true,
    'goForward': true,
    'goto': true,
    'reload': true,
};

var PageRenderer = function (baseUrl, page) {
    this.webpage = page;

    this.selectorMarkerClass = 0;
    this.pageLogs = [];
    this.baseUrl = baseUrl;
    this.lifeCycleEventEmitter = new EventEmitter();
    this.activeRequestCount = 0;

    if (this.baseUrl.substring(-1) !== '/') {
        this.baseUrl = this.baseUrl + '/';
    }

    PAGE_PROPERTIES_TO_PROXY.forEach((propertyName) => {
        Object.defineProperty(this, propertyName, {
            value: this.webpage[propertyName],
            writable: false,
            configurable: true,
        });
    });

    this.webpage.setViewport({
        width: 1350,
        height: 768,
    });
    this._setupWebpageEvents();
};

PageRenderer.prototype.newWebPage = async function () {
    const browser = this.webpage.browser();

    await this.webpage.close();

    this.webpage = await browser.newPage();

    PAGE_PROPERTIES_TO_PROXY.forEach((propertyName) => {
        Object.defineProperty(this, propertyName, {
            value: this.webpage[propertyName],
            writable: false,
            configurable: true,
        });
    });

    this.webpage.setViewport({
        width: 1350,
        height: 768,
    });
    this._setupWebpageEvents();
};

PageRenderer.prototype._reset = function () {
    this.pageLogs = [];
    this.webpage.setViewport({
        width: 1350,
        height: 768,
    });
};

PageRenderer.prototype.isVisible = function (selector) {
    return this.webpage.evaluate(() => {
        return jQuery(selector).is(':visible');
    });
};

PageRenderer.prototype.jQuery = async function (selector, options = {}) {
    const selectorMarkerClass = '__selector_marker_' + this.selectorMarkerClass;

    ++this.selectorMarkerClass;

    await this.waitFor(() => !! window.jQuery);

    if (options.waitFor) {
        try {
            await this.waitFor((selector) => {
                return !!jQuery(selector).length;
            }, {}, selector);
        } catch (err) {
            err.message += " (selector = " + selector + ")";
            throw err;
        }
    }

    await this.webpage.evaluate((selectorMarkerClass, s) => {
        jQuery(s).addClass(selectorMarkerClass);
    }, selectorMarkerClass, selector);

    return await this.webpage.$('.' + selectorMarkerClass);
};

PageRenderer.prototype.screenshotSelector = async function (selector) {
    await this.waitFor(() => !! window.jQuery);

    const result = await this.webpage.evaluate(function (selector) {
        window.jQuery('html').addClass('uiTest');

        var docWidth = window.jQuery(document).width(),
            docHeight = window.jQuery(document).height();

        function isInvalidBoundingRect (rect) {
            return !rect.width || !rect.height
                || (rect.left < 0 && rect.right < 0)
                || (rect.left > docWidth && rect.right > docWidth)
                || (rect.top < 0 && rect.bottom < 0)
                || (rect.top > docHeight && rect.bottom > docHeight);
        }

        var element = window.jQuery(selector);
        if (element && element.length) {
            var clipRect = {bottom: null, height: null, left: null, right: null, top: null, width: null};

            element.each(function (index, node) {
                if (!jQuery(node).is(':visible')) {
                    return;
                }

                var rect = jQuery(node).offset();
                rect.width = jQuery(node).outerWidth();
                rect.height = jQuery(node).outerHeight();
                rect.right = rect.left + rect.width;
                rect.bottom = rect.top + rect.height;

                if (isInvalidBoundingRect(rect)) {
                    // element is not visible
                    return;
                }

                if (null === clipRect.left || rect.left < clipRect.left) {
                    clipRect.left = rect.left;
                }
                if (null === clipRect.top || rect.top < clipRect.top) {
                    clipRect.top = rect.top;
                }
                if (null === clipRect.right || rect.right > clipRect.right) {
                    clipRect.right = rect.right;
                }
                if (null === clipRect.bottom || rect.bottom > clipRect.bottom) {
                    clipRect.bottom = rect.bottom;
                }
            });

            clipRect.width  = clipRect.right - clipRect.left;
            clipRect.height = clipRect.bottom - clipRect.top;

            return clipRect;
        }
    }, selector);

    if (!result) {
        console.log("Cannot find element " + selector);
        return;
    }

    if (result && result.__isCallError) {
        throw new Error("Error while detecting element clipRect " + selector + ": " + result.message);
    }

    if (null === result.left
        || null === result.top
        || null === result.bottom
        || null === result.right
    ) {
        console.log("Element(s) " + selector + " found but none is visible");
        return;
    }

    return await this.screenshot({
        clip: {
            x: result.left,
            y: result.top,
            width: result.width,
            height: result.height,
        },
    });
};

PAGE_METHODS_TO_PROXY.forEach(function (methodName) {
    PageRenderer.prototype[methodName] = function (...args) {
        if (methodName === 'goto') {
            let url = args[0];
            if (url.indexOf("://") === -1 && url !== 'about:blank') {
                url = this.baseUrl + url;
            }
            args[0] = url;
        }

        if (methodName === 'goto' || methodName === 'reload') {
            if (typeof args[1] === 'object') {
                args[1].timeout = 0;
            } else {
                args[1] = {
                    timeout: 0,
                };
            }
        }

        let result;
        if (methodName === 'screenshot') {
            // change viewport to entire page before screenshot
            result = this.webpage.waitFor(() => !! document.documentElement)
                .then(() => {
                    return this.webpage.evaluate(() => JSON.stringify({
                        width: document.documentElement.scrollWidth,
                        height: document.documentElement.scrollHeight,
                    }));
                }).then((dims) => {
                    return this.webpage.setViewport(JSON.parse(dims));
                }).then(() => {
                    return this.webpage[methodName](...args);
                });
        } else {
            result = this.webpage[methodName](...args);
        }

        if (result && result.then && AUTO_WAIT_METHODS[methodName]) {
            result = result.then((value) => {
                return this.waitForNetworkIdle().then(() => value);
            });
        }

        return result;
    };
});

PageRenderer.prototype.waitForNetworkIdle = async function () {
    await new Promise(resolve => setTimeout(resolve, AJAX_IDLE_THRESHOLD));

    while (this.activeRequestCount > 0) {
        await new Promise(resolve => setTimeout(resolve, AJAX_IDLE_THRESHOLD));
    }
};

PageRenderer.prototype.downloadUrl = async function (url) {
    return await this.webpage.evaluate(function (url) {
        var $ = window.jQuery;

        return $.ajax({
            type: "GET",
            url: url,
            async: false
        }).responseText;
    }, url);
};

PageRenderer.prototype._isUrlThatWeCareAbout = function (url) {
    return -1 === url.indexOf('proxy/misc/user/favicon.png?r=') && -1 === url.indexOf('proxy/misc/user/logo.png?r=');
};

PageRenderer.prototype._logMessage = function (message) {
    this.pageLogs.push(message);
};

PageRenderer.prototype.clearCookies = function () {
    // see https://github.com/GoogleChrome/puppeteer/issues/1632#issuecomment-353086292
    return this.webpage._client.send('Network.clearBrowserCookies');
};

PageRenderer.prototype._setupWebpageEvents = function () {
    this.webpage.on('error', (message, trace) => {
        var msgStack = ['Webpage error: ' + message];
        if (trace && trace.length) {
            msgStack.push('trace:');
            trace.forEach(function(t) {
                msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
            });
        }

        this._logMessage(msgStack.join('\n'));
    });

    this.webpage.on('load', () => {
        this.webpage.evaluate(function () {
            var $ = window.jQuery;
            if ($) {
                jQuery('html').addClass('uiTest');
                $.fx.off = true;
            }
        });

        this.webpage.addStyleTag({content: '* { caret-color: transparent !important; -webkit-transition: none !important; transition: none !important; -webkit-animation: none !important; animation: none !important; }'});
    });

    this.webpage._client.on('Page.lifecycleEvent', (event) => {
        this.lifeCycleEventEmitter.emit('lifecycleEvent', event);
    });

    const parsedPiwikUrl = parseUrl(config.piwikUrl);

    var piwikHost = parsedPiwikUrl.hostname,
        piwikPort = parsedPiwikUrl.port;

    this.webpage.setRequestInterception(true);
    this.webpage.on('request', (request) => {
        ++this.activeRequestCount;

        var url = request.url();

        // replaces the requested URL to the piwik URL w/ a port, if it does not have one.  This allows us to run UI
        // tests when Piwik is on a port, w/o having to have different UI screenshots. (This is one half of the
        // solution, the other half is in config/environment/ui-test.php, where we remove all ports from Piwik URLs.)
        if (piwikPort && piwikPort !== 0) {
            const parsedRequestUrl = parseUrl(url);

            if (parsedRequestUrl.hostname === piwikHost && (!parsedRequestUrl.port || parseInt(parsedRequestUrl.port) === 0 || parseInt(parsedRequestUrl.port) === 80)) {

                parsedRequestUrl.port = piwikPort;
                parsedRequestUrl.host = piwikHost + ':' + piwikPort;

                url = formatUrl(parsedRequestUrl);

                request.continue({
                    url,
                });


                if (VERBOSE) {
                    this._logMessage('Requesting resource (#' + request.id + 'URL:' + url + ')');
                }

                return;
            }
        }

        request.continue();

        if (VERBOSE) {
            this._logMessage('Requesting resource (#' + request.id + 'URL:' + url + ')');
        }
    });

    // TODO: self.aborted?
    this.webpage.on('requestfailed', async (request) => {
        --this.activeRequestCount;

        const failure = request.failure();
        const errorMessage = failure ? failure.errorText : 'Unknown error';

        if (!VERBOSE) {
            this._logMessage('Unable to load resource (URL:' + request.url() + '): ' + errorMessage);
        }

        if (request.url().indexOf('action=getCss')) {
            if (errorMessage === 'net::ERR_ABORTED') {
                console.log('CSS request aborted.');
            } else if (request.url().indexOf('&reload=1') === -1) {
                console.log('Loading CSS failed (' + errorMessage + ')... Try adding it with another style tag.');
                await this.webpage.addStyleTag({url: request.url() + '&reload=1'}); // add another get parameter to ensure browser doesn't use cache
                await this.webpage.waitFor(1000);
            } else {
                console.log('Reloading CSS failed (' + errorMessage + ').');
            }
        }
    });

    this.webpage.on('requestfinished', async (request) => {
        --this.activeRequestCount;

        const response = request.response();
        if (VERBOSE || (response.status() >= 400 && this._isUrlThatWeCareAbout(request.url()))) {
            const body = await response.buffer();
            const message = 'Response (size "' + body.length + '", status "' + response.status() + '"): ' + request.url() + "\n" + body.toString();
            this._logMessage(message);
        }

        // if response of css request does not start with /*, we assume it had an error and try to load it again
        // Note: We can't do that in requestfailed only, as the response code might be 200 even if it throws an exception
        if (request.url().indexOf('action=getCss') !== -1) {
            var body = await response.buffer();
            if (body.toString().substring(0, 2) === '/*') {
                return;
            }
            if (request.url().indexOf('&reload=1') === -1) {
                console.log('Loading CSS failed... Try adding it with another style tag.');
                await this.webpage.addStyleTag({url: request.url() + '&reload=1'}); // add another get parameter to ensure browser doesn't use cache
                await this.webpage.waitFor(1000);
            } else {
                console.log('Reloading CSS failed.');
            }
            console.log('Response (size "' + body.length + '", status "' + response.status() + ', headers "' + JSON.stringify(response.headers()) + '"): ' + request.url() + "\n" + body.toString());
        }
    });

    this.webpage.on('console', async (consoleMessage) => {
        const args = await Promise.all(consoleMessage.args().map(arg => arg.executionContext().evaluate(arg => {
            if (arg instanceof Error) {
                return arg.stack || arg.message;
            }
            return arg;
        }, arg)));
        const message = args.join(' ');
        this._logMessage(`Log: ${message}`);
    });

    this.webpage.on('dialog', (dialog) => {
        this._logMessage(`Alert: ${dialog.message()}`);
    });
};

PageRenderer.prototype.getPageLogsString = function(indent) {
    var result = "";
    if (this.pageLogs.length) {
        result = "\n\n" + indent + "Rendering logs:\n";
        this.pageLogs.slice(0, 5).forEach(function (message) {
            result += indent + "  " + message.replace(/\n/g, "\n" + indent + "  ") + "\n";
        });
        result = result.substring(0, result.length - 1);
    }
    return result;
};

PageRenderer.prototype.getWholeCurrentUrl = function () {
    return this.webpage.evaluate(() => window.location.href);
};


exports.PageRenderer = PageRenderer;
