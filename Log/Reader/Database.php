<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\Log\Reader;

use Piwik\Common;
use Piwik\Db;
use Piwik\Plugins\LogViewer\Log\Line;
use Piwik\Plugins\LogViewer\Log\Reader;

class Database implements Reader
{
    private $lines = array();
    private $table;
    private $lowestIdLogMessageFromPreviousRun;

    public function __construct()
    {
        $this->db    = Db::get();
        $this->table = Common::prefixTable('logger_message');
    }

    /**
     * Reads latest log lines first.
     *
     * @return Line|void  Returns null once no more log lines available
     */
    public function nextLine()
    {
        if (empty($this->lines)) {
            // we need to look for new one log lines
            $this->lines = $this->fetchLines();

            if (empty($this->lines)) {
                return; // no more log entries
            }
        }

        $line = array_shift($this->lines);
        return new Line($line['message']);
    }

    private function fetchLines()
    {
        $bind  = array();
        $query = "SELECT idlogger_message, message FROM " . $this->table;

        if (isset($this->lowestIdLogMessageFromPreviousRun)) {
            // prevent fetching the same log entries from before
            $query  .= " WHERE `idlogger_message` < ?";
            $bind[] = $this->lowestIdLogMessageFromPreviousRun;
        }

        // we always fetch 100 lines in advance to not having to send 100 single queries
        $query .= " ORDER BY idlogger_message desc LIMIT 100";

        $lines = $this->db->fetchAll($query, $bind);

        foreach ($lines as $line) {
            if (!isset($this->lowestIdLogMessageFromPreviousRun)) {
                $this->lowestIdLogMessageFromPreviousRun = $line['idlogger_message'];
            } elseif ($line['idlogger_message'] < $this->lowestIdLogMessageFromPreviousRun) {
                $this->lowestIdLogMessageFromPreviousRun = $line['idlogger_message'];
            }
        }

        return $lines;

    }

}
