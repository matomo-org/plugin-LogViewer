<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\Log;

class Line
{
    public $content;

    public function __construct($content)
    {
        $this->content = $content;
    }

}
