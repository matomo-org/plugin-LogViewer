/*!
 * Piwik - free/libre analytics platform
 *
 * Screenshot integration tests.
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

describe("LogViewer", function () {
    this.timeout(0);

    var generalParams = 'idSite=1&period=day&date=2010-01-03';

    function searchForText(page, textToAppendToSearchField)
    {
        page.sendKeys(".logViewer .search", textToAppendToSearchField);
        page.click('.logViewer .searchIcon');
        page.wait(100);
    }

    function loadLogViewerPage(page)
    {
        page.load("?" + generalParams + "&module=LogViewer&action=index&uitest=1");
    }

    function overrideTestEnvironment(logWriters)
    {
        testEnvironment.pluginsToLoad = ['LogViewer'];
        testEnvironment.configOverride = {
            log: {
                'log_writers': logWriters
            }
        };
        testEnvironment.save();
    }

    beforeEach(function () {
        overrideTestEnvironment(['file']);
    });

    it('should show a simple log page', function (done) {
        expect.screenshot('logview_inital').to.be.captureSelector('#content', function (page) {
            loadLogViewerPage(page);
        }, done);
    });

    it('should be visible in the menu', function (done) {
        expect.screenshot('link_in_menu').to.be.captureSelector('li:contains(Diagnostic)', function (page) {
        }, done);
    });

    it('should be able to search', function (done) {
        expect.screenshot('search').to.be.captureSelector('#content', function (page) {
            searchForText(page, 'Widget');
        }, done);
    });

    it('should show a message if there are no results', function (done) {
        expect.screenshot('no_results').to.be.captureSelector('#content', function (page) {
            searchForText(page, 'rwererer');
        }, done);
    });

    it('should automatically preselect configured log writer', function (done) {
        expect.screenshot('preselected_logwriter').to.be.captureSelector('#content', function (page) {
            overrideTestEnvironment(['database']);
            loadLogViewerPage(page);
        }, done);
    });

    it('should show a message if there are no results', function (done) {
        expect.screenshot('info_no_supported_writer').to.be.captureSelector('#content', function (page) {
            overrideTestEnvironment(['']);
            loadLogViewerPage(page);
        }, done);
    });

    it('should filter for severity when clicking on one', function (done) {
        expect.screenshot('filter_severity').to.be.captureSelector('#content', function (page) {
            loadLogViewerPage(page);
            page.click('tr:nth-child(1) td.severity');
        }, done);
    });

    it('should filter for date when clicking on one', function (done) {
        expect.screenshot('filter_date').to.be.captureSelector('#content', function (page) {
            page.click('tr:nth-child(1) td.date');
        }, done);
    });

    it('should filter for requestId when clicking on one', function (done) {
        expect.screenshot('filter_requestId').to.be.captureSelector('#content', function (page) {
            page.click('tr:nth-child(1) td.requestId');
        }, done);
    });

    it('should filter for tag when clicking on one', function (done) {
        expect.screenshot('filter_tag').to.be.captureSelector('#content', function (page) {
            page.click('tr:nth-child(1) td.tag');
        }, done);
    });
});