<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\Log;

interface Reader
{
    /**
     * Returns a log line.
     *
     * Latest log messages should be returned first.
     *
     * @return Line|null Returns next log line or null if end of log
     */
    public function nextLine();

}
