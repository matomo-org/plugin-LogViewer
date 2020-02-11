<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\tests\Unit\Log;
use Piwik\Plugins\LogViewer\Log\Line;
use Piwik\Plugins\LogViewer\Log\Query;
use Piwik\Plugins\LogViewer\Log\Result;

/**
 * @group LogViewer
 * @group Query
 * @group QueryTest
 * @group Plugins
 */
class QueryTest extends \PHPUnit\Framework\TestCase
{
    public function test_matches_shouldAlwaysMatchIfNoQueryIsGiven()
    {
        $query = $this->buildQuery('');
        $line  = $this->buildLine('test');

        $this->assertTrue($query->matches($line));
    }

    /**
     * @dataProvider getQueries
     */
    public function test_matches($expectedMatch, $query, $line)
    {
        $query = $this->buildQuery($query);
        $line  = $this->buildLine($line);

        $this->assertSame($expectedMatch, $query->matches($line));
    }

    public function getQueries()
    {
        return array(
            array($expectedMatch = true, $query = 'tes', $line = 'test'),
            array($expectedMatch = true, $query = 'TeS', $line = 'test'), // case insenstive should work
            array($expectedMatch = false, $query = 'teste', $line = 'test'),
            array($expectedMatch = true, $query = '^test$', $line = 'test'),
            array($expectedMatch = false, $query = '^tes$', $line = 'test'),
            array($expectedMatch = true, $query = 'te/s', $line = 'te/st'), // should escape slash
            array($expectedMatch = true, $query = "te's", $line = "te'st"),
        );
    }

    private function buildLine($content)
    {
        return new Line($content);
    }

    private function buildQuery($query)
    {
        return new Query($query);
    }

}
