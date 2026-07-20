<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer;

use Piwik\Config;
use Piwik\Piwik;
use Piwik\Plugins\LogViewer\Log\Log;
use Piwik\Plugins\LogViewer\Log\Parser\Piwik as PiwikParser;
use Piwik\Plugins\LogViewer\Log\Query;
use Piwik\Plugins\LogViewer\Log\Result;

/**
 * API endpoints for browsing Matomo log entries and log reader settings.
 *
 * @method static \Piwik\Plugins\LogViewer\API getInstance()
 */
class API extends \Piwik\Plugin\API
{
    /**
     * Returns parsed log entries from the selected log source.
     *
     * Latest log entries are returned first.
     *
     * @param string $query A case-insensitive regular expression used to filter log entries.
     *                      Characters such as `[` may need to be escaped as `\[`.
     * @param 'file'|'database'|false $source The log reader to use, or `false` to auto-detect the best available source.
     * @param int $page Zero-based page number to return.
     * @param int $limitPerPage Maximum number of log entries to return for the requested page.
     * @return list<array{severity: string, tag: string, datetime: string, requestId: string, message: string}|object>
     *         Parsed log entries ordered from newest to oldest.
     */
    public function getLogEntries($query = '', $source = false, $page = 0, $limitPerPage = 10)
    {
        Piwik::checkUserHasSuperUserAccess();

        $logReaderFactory = new LogReaderFactory();
        $reader           = $logReaderFactory->make($source);

        $log    = new Log($reader);
        $result = $log->find(new Query($query), new Result($limitPerPage, $page));

        $parser = new PiwikParser();

        $return = array();
        foreach ($result->getLogLines() as $logLine) {
            $return[] = $parser->parse($logLine);
        }

        return $return;
    }

    /**
     * Returns the log reader backends supported in the current environment.
     *
     * @return list<string> Available log reader identifiers such as `file` or `database`.
     */
    public function getAvailableLogReaders()
    {
        Piwik::checkUserHasSuperUserAccess();

        $logReaderFactory = new LogReaderFactory();
        return $logReaderFactory->getAvailableLogReaders();
    }

    /**
     * Returns the configured log reader backends that are currently available.
     *
     * @return list<string> Configured log reader identifiers that can be used by the plugin.
     */
    public function getConfiguredLogReaders()
    {
        Piwik::checkUserHasSuperUserAccess();

        $logReaderFactory = new LogReaderFactory();
        return $logReaderFactory->getConfiguredLogReaders();
    }

    /**
     * Returns the configured Matomo log settings.
     *
     * @return array<string, mixed> The `[log]` configuration values from the active Matomo config.
     */
    public function getLogConfig()
    {
        Piwik::checkUserHasSuperUserAccess();

        return Config::getInstance()->log;
    }
}
