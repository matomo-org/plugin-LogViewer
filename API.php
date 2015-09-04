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

    public function getConfiguredLogReader()
    {
        Piwik::checkUserHasSuperUserAccess();

        $logReaderFactory = new LogReaderFactory();
        return $logReaderFactory->getConfiguredLogReader();
    }

}
