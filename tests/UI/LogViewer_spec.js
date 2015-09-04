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

    before(function () {
        testEnvironment.pluginsToLoad = ['LogViewer'];
        testEnvironment.configOverride = {log_writers: ['file']};
        testEnvironment.save();
    });

    it('should show a simple log page', function (done) {
        expect.screenshot('logview_inital').to.be.captureSelector('#content', function (page) {
            page.load("?" + generalParams + "&module=LogViewer&action=index");
        }, done);
    });

    it('should be visible in the menu', function (done) {
        expect.screenshot('link_in_menu').to.be.captureSelector('li:contains(Diagnostic)', function (page) {
        }, done);
    });
});