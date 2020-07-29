<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\Log;

class Result
{
    private $logsPerPage;
    private $page;

    private $limitStart;
    private $limitEnd;

    private $numFound = 0;

    /**
     * @var Line[]
     */
    private $logLines = array();

    public function __construct($logsPerPage, $page)
    {
        $this->logsPerPage = $logsPerPage;
        $this->page        = $page;

        $this->limitStart = $logsPerPage * $page;
        $this->limitEnd   = $this->limitStart + $logsPerPage;
    }

    public function addLogLine(Line $logline)
    {
        if ($this->numFound >= $this->limitStart && $this->numFound < $this->limitEnd) {
            $this->logLines[] = $logline;
        }

        $this->numFound++;
    }

    /**
     * @return Line[]
     */
    public function getLogLines()
    {
        return $this->logLines;
    }

    public function hasEnoughLogsInPage()
    {
        return $this->numFound >= $this->limitEnd;
    }
}
