<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\tests\Unit;
use Piwik\Plugins\LogViewer\Log\Line;
use Piwik\Plugins\LogViewer\Log\Parser\Piwik;

/**
 * @group LogViewer
 * @group Piwik
 * @group PiwikTest
 * @group Plugins
 */
class PiwikTest extends \PHPUnit\Framework\TestCase
{
    /**
     * @dataProvider getLogLines
     */
    public function test_shouldParseLogLine($expected, $logLine)
    {
        $line   = new Line($logLine);
        $parser = new Piwik();

        $this->assertSame($expected, $parser->parse($line));
    }

    public function getLogLines()
    {
        $lines = array();

        // invalid line should still return message
        $lines[] = array(
            $this->buildParsed('Any message[that does not match should still return message]'),
            'Any message[that does not match should still return message]'
        );

        // valid line should everything be detected
        $lines[] = array(
            $this->buildParsed("'idsite' => '1',", "DEBUG", "Piwik\Common", "2015-08-19 08:21:01", "7c7d2"),
            "DEBUG Piwik\Common[2015-08-19 08:21:01] [7c7d2] 'idsite' => '1',"
        );

        // should remove a forum message
        $lines[] = array(
            $this->buildParsed("'idsite' => '1'", "DEBUG", "Piwik\Common", "2015-08-19 08:21:01", "7c7d2"),
            "DEBUG Piwik\Common[2015-08-19 08:21:01] [7c7d2] 'idsite' => '1' - Please report this message in the Piwik forums: http://forum.piwik.org (please do a search first as it might have been reported already)"
        );

        return $lines;
    }

    private function buildParsed($message = '', $severity = '', $tag = '', $datetime = '', $requestId = '')
    {
        return array(
            'severity'  => $severity,
            'tag'       => $tag,
            'datetime'  => $datetime,
            'requestId' => $requestId,
            'message'   => $message,
        );
    }

}
