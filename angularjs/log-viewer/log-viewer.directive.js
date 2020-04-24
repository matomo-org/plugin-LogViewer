/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Limit: Specify number of log lines per page
 *
 * Usage:
 * <div piwik-log-viewer limit="10">
 */
(function () {
    angular.module('piwikApp').directive('piwikLogViewer', piwikLogViewer);

    piwikLogViewer.$inject = ['piwik'];

    function piwikLogViewer(piwik){
        return {
            restrict: 'A',
            scope: {
               limit: '='
            },
            templateUrl: 'plugins/LogViewer/angularjs/log-viewer/log-viewer.directive.html?cb=' + piwik.cacheBuster,
            controller: 'LogViewerController',
            controllerAs: 'logViewer'
        };
    }
})();