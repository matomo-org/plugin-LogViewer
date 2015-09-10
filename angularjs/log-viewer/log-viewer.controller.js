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
        this.isLoading = true;
        this.logWriters = [];
        this.selectedLogWriter = '';
        this.useRegExp = false;
        this.severities = ['DEBUG', 'INFO', 'NOTICE', 'WARNING', 'ERROR', 'CRITICAL', 'ALERT', 'EMERGENCY'];
        this.selectedSeverity = '';

        var fetchLogEntriesPromise;

        function createNotification() {
            var UI = require('piwik/UI');
            return new UI.Notification();
        }

        piwikApi.fetch({
            method: 'LogViewer.getAvailableLogReaders'
        }).then(function (logWriters) {
            if (angular.isArray(logWriters)) {
                self.logWriters = logWriters;
            }
        }).then(function () {
            return piwikApi.fetch({
                method: 'LogViewer.getConfiguredLogReaders'
            });
        }).then(function (logWriters) {
            if (angular.isArray(logWriters) && logWriters[0]) {
                self.selectedLogWriter = logWriters[0];
            } else {
                var title = _pk_translate('LogViewer_NoSupportedLogWriterConfiguredTitle');
                var message = _pk_translate('LogViewer_NoSupportedLogWriterConfiguredMessage', ['<a href="https://piwik.org/faq/troubleshooting/faq_115/">', '</a>', self.logWriters.join(', '), ]);
                createNotification().show(message, {title: title, context: 'info', noclear: true});

                if (self.logWriters && self.logWriters[0]) {
                    self.selectedLogWriter = self.logWriters[0];
                }
            }

            if (self.selectedLogWriter) {
                self.update();
            } else {
                this.isLoading = false;
            }
        });

        this.update = function () {
            this.isLoading = true;

            var query = this.query;
            if (!this.useRegExp) {
                query = preg_quote(query);
            }

            if (this.selectedSeverity) {
                query = '^' + this.selectedSeverity + '(.*)' + query;
            }

            if (fetchLogEntriesPromise) {
                fetchLogEntriesPromise.abort();
                fetchLogEntriesPromise = null;
            }

            this.logs = [];

            fetchLogEntriesPromise = piwikApi.fetch({
                method: 'LogViewer.getLogEntries',
                query: query,
                limitPerPage: $scope.limit,
                source: self.selectedLogWriter,
                page: self.page,
            }).then(function (logs) {
                self.isLoading = false;
                self.logs = logs;
            }).catch(function (error) {
                self.isLoading = false;
                createNotification().show(error, {context: 'error'});
            });
        };

        this.searchSeverity = function (severity) {
            if (!severity) {
                return;
            }
            this.selectedSeverity = ('' + severity).toUpperCase();
            this.update();
        };

        this.searchDate = function (datetime) {
            if (!datetime) {
                return;
            }
            this.selectedSeverity = '';
            this.query = '\\[' + datetime.substr(0, 10) + '.{9}\\]';
            this.useRegExp = true;
            this.update();
        };

        this.searchRequestId = function (requestId) {
            if (!requestId) {
                return;
            }
            this.searchText('[' + requestId + ']');
        };

        this.searchText = function (text) {
            if (!text) {
                return;
            }
            this.selectedSeverity = '';
            this.query = text;
            if (this.useRegExp) {
                this.query = preg_quote(this.query);
            }
            this.update();
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