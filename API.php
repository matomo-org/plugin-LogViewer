<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer;

use Piwik\Config;
use Piwik\DataTable;
use Piwik\DataTable\Row;
use Piwik\Piwik;
use Piwik\Plugins\LogViewer\Log\Log;
use Piwik\Plugins\LogViewer\Log\Parser\Piwik as PiwikParser;
use Piwik\Plugins\LogViewer\Log\Result;
use Piwik\Plugins\LogViewer\Log\Query;

/**
 * API for plugin LogViewer
 *
 * @method static \Piwik\Plugins\LogViewer\API getInstance()
 */
class API extends \Piwik\Plugin\API
{
    /**
     * Get log entries.
     *
     * Latest log entries are returned first.
     *
     * @param string $query  A search query. If given, the search is performed case insensitive and query is interpreted
     *                       as a regular expression. Characters like `[` might need to be escaped as `\[`.
     * @param string|false $source The log reader to use. Either 'file' or 'database'.
     *                            By default we try to detect the best reader automatically.
     * @param int $page           The page that should be returned.
     * @param int $limitPerPage   Defines how many log entries should be returned per page.
     * @return array
     * @throws \Exception Eg if the source cannot be chosen automatically.
     */
    public function getLogEntries($query = '', $source = false, $page = 0, $limitPerPage = 10)
    {
        Piwik::checkUserHasSuperUserAccess();

        $logReaderFactory = new LogReaderFactory();
        $reader = $logReaderFactory->make($source);

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
     * Returns a list of all available log readers.
     *
     * @return string[]
     */
    public function getAvailableLogReaders()
    {
        Piwik::checkUserHasSuperUserAccess();

        $logReaderFactory = new LogReaderFactory();
        return $logReaderFactory->getAvailableLogReaders();
    }


    /**
     * Returns a list of all configured log readers that are supported (available).
     *
     * @return string[]
     */
    public function getConfiguredLogReaders()
    {
        Piwik::checkUserHasSuperUserAccess();

        $logReaderFactory = new LogReaderFactory();
        return $logReaderFactory->getConfiguredLogReaders();
    }

}
