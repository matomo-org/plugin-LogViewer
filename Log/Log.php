<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\Log;

class Log
{
    /**
     * @var Reader
     */
    private $parser;

    public function __construct(Reader $parser)
    {
        $this->parser = $parser;
    }

    public function find(Query $query, Result $result)
    {
        while ($nextLine = $this->parser->nextLine()) {
            if ($query->matches($nextLine)) {
                $result->addLogLine($nextLine);
            }

            if ($result->hasEnoughLogsInPage()) {
                break;
            }
        }

        return $result;
    }
}
