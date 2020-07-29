<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\Log;

class Query
{
    public function __construct($query)
    {
        $this->query = $query;
    }

    public function matches(Line $line)
    {
        return empty($this->query) || preg_match('/' . str_replace('/', '\/', $this->query) . '/i', $line->content);
    }
}
