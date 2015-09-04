/*!
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
(function () {
    angular.module('piwikApp').controller('LogViewerController', LogViewerController);

    LogViewerController.$inject = ['$scope', 'piwikApi'];

    function LogViewerController($scope, piwikApi) {
        var self = this;

        this.page = 0;
        this.query = '';

        piwikApi.fetch({
            method: 'LogViewer.getConfiguredLogReader'
        }).then(function (logWriters) {
            if (!angular.isArray(logWriters)) {
                return;
            }

            self.logWriters = logWriters;

            if (logWriters[0]) {
                self.selectedLogWriter = logWriters[0];
            }

            self.update();
        });

        this.update = function () {
            piwikApi.fetch({
                method: 'LogViewer.getLogEntries',
                query: self.query,
                limitPerPage: $scope.limit,
                source: self.selectedLogWriter,
                page: self.page,
            }).then(function (logs) {
                self.logs = logs;
            });
        };

        this.previousPage = function () {
            if (this.page > 0) {
                this.page--;
                this.update();
            }
        };

        this.nextPage = function () {
            if (this.logs && this.logs.length) {
                this.page++;
                this.update();
            }
        };
    }
})();