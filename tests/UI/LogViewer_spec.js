/*!
 * Matomo - free/libre analytics platform
 *
 * Screenshot integration tests.
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

describe("LogViewer", function () {
    this.timeout(0);

    var generalParams = 'idSite=1&period=day&date=2010-01-03';

    async function searchForText(textToAppendToSearchField)
    {
        await page.type(".logViewer .search", textToAppendToSearchField);
        await page.click('.logViewer .searchIcon');
        await page.mouse.move(-10, -10);
        await page.waitForNetworkIdle();
    }

    async function loadLogViewerPage()
    {
        await page.goto("?" + generalParams + "&module=LogViewer&action=index&uitest=1");
        await page.waitFor('#content .logViewer', { timeout: 180000 });
    }

    // for some reason, loading the same URL again can cause puppeteer to not reload/re-run the javascript, breaking the tests
    async function reloadLogViewerPage() {
        await page.reload();
        await page.waitFor('#content [piwik-log-viewer]', { timeout: 180000 });
    }

    function overrideTestEnvironment(logWriters)
    {
        testEnvironment.pluginsToLoad = ['LogViewer'];
        testEnvironment.configOverride = {
            log: {
                'log_writers': logWriters,
                'logger_file_path': PIWIK_INCLUDE_PATH + '/plugins/LogViewer/tests/resources/piwik.log'
            }
        };
        testEnvironment.save();
    }

    beforeEach(function () {
        overrideTestEnvironment(['file']);
    });

    it('should show a simple log page', async function () {
        await loadLogViewerPage();
        var elem = await page.jQuery('#content');
        expect(await elem.screenshot()).to.matchImage('logview_inital');
    });

    it('should be visible in the menu', async function () {
        var elem = await page.jQuery('li:contains(Diagnostic)');
        expect(await elem.screenshot()).to.matchImage('link_in_menu');
    });

    it('should be able to search', async function () {
        await searchForText('Widget');
        var elem = await page.jQuery('#content');
        expect(await elem.screenshot()).to.matchImage('search');
    });

    it('should show a message if there are no results', async function () {
        await searchForText('rwererer');
        var elem = await page.jQuery('#content');
        expect(await elem.screenshot()).to.matchImage('no_results');
    });

    it('should automatically preselect configured log writer', async function () {
        await overrideTestEnvironment(['database']);
        await reloadLogViewerPage();
        var elem = await page.jQuery('#content');
        expect(await elem.screenshot()).to.matchImage('preselected_logwriter');
    });

    it('should show a message if there is not logger', async function () {
        await overrideTestEnvironment(['']);
        await reloadLogViewerPage();
        expect(await page.screenshotSelector('#notificationContainer .notification-info, #content')).to.matchImage('info_no_supported_writer');
    });

    it('should filter for severity when clicking on one', async function () {
        await reloadLogViewerPage();
        await page.waitFor('tr:nth-child(1) td.severity', { timeout: 180000 });
        await page.click('tr:nth-child(1) td.severity');
        await page.mouse.move(-10, -10);
        await page.waitForNetworkIdle();
        var elem = await page.jQuery('#content');
        expect(await elem.screenshot()).to.matchImage('filter_severity');
    });

    it('should filter for date when clicking on one', async function () {
        await page.click('tr:nth-child(1) td.date');
        await page.mouse.move(-10, -10);
        await page.waitForNetworkIdle();
        var elem = await page.jQuery('#content');
        expect(await elem.screenshot()).to.matchImage('filter_date');
    });

    it('should filter for requestId when clicking on one', async function () {
        await page.click('tr:nth-child(1) td.requestId');
        await page.mouse.move(-10, -10);
        await page.waitForNetworkIdle();
        var elem = await page.jQuery('#content');
        expect(await elem.screenshot()).to.matchImage('filter_requestId');
    });

    it('should filter for tag when clicking on one', async function () {
        await page.click('tr:nth-child(1) td.tag');
        await page.mouse.move(-10, -10);
        await page.waitForNetworkIdle();
        var elem = await page.jQuery('#content');
        expect(await elem.screenshot()).to.matchImage('filter_tag');
    });
});