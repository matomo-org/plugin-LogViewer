<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\Log\Parser;

use Piwik\Plugins\LogViewer\Log\Line;
use Piwik\Plugins\LogViewer\Log\Parser;

class Piwik implements Parser
{
    public function parse(Line $line)
    {
        $severity  = '';
        $tag       = '';
        $datetime  = '';
        $requestId = '';

        // a typical log line looks like: $severity $tag[$datetime] [$requestId] $message
        if (preg_match('/^(.*?) (.+?)\[(.*?)\] \[(.*?)\] (.+)$/', $line->content, $matches)) {
            $severity  = $matches[1];
            $tag       = $matches[2];
            $datetime  = $matches[3];
            $requestId = $matches[4];
            $message   = $matches[5];
        } else {
            $message = $line->content;
        }

        $message = $this->removeForumMessageIfPresent($message);

        return array(
            'severity'  => trim($severity),
            'tag'       => trim($tag),
            'datetime'  => trim($datetime),
            'requestId' => trim($requestId),
            'message'   => trim($message),
        );
    }

    private function removeForumMessageIfPresent($message)
    {
        $pos = strpos($message, '- Please report this message');

        if ($pos !== false) {
            $message = substr($message, 0, $pos);
        }

        return $message;
    }

}
