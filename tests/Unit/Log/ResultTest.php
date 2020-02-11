<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\tests\Unit\Log;
use Piwik\Plugins\LogViewer\Log\Line;
use Piwik\Plugins\LogViewer\Log\Result;

/**
 * @group LogViewer
 * @group Result
 * @group ResultTest
 * @group Plugins
 */
class ResultTest extends \PHPUnit\Framework\TestCase
{
    public function test_addLogLine_shouldNotReturnAnyLogLine_IfNoneRequested()
    {
        $result = $this->buildResult($limit = 0, $page = 0);
        $result->addLogLine($this->buildLine());
        $this->assertSame(array(), $result->getLogLines());
    }

    public function test_addLogLine_shouldOnlyAddNeededAmountOfLogLines()
    {
        $result = $this->buildResult($limit = 2, $page = 0);
        $result->addLogLine($line1 = $this->buildLine());
        $result->addLogLine($line2 = $this->buildLine());
        $result->addLogLine($line3 = $this->buildLine());
        $result->addLogLine($line4 = $this->buildLine());

        $this->assertSame(array($line1, $line2), $result->getLogLines());
    }

    public function test_addLogLine_shouldRespectPagingAndKeepOnlyLinesForThatPage()
    {
        $result = $this->buildResult($limit = 2, $page = 1);
        $result->addLogLine($line1 = $this->buildLine());
        $result->addLogLine($line2 = $this->buildLine());
        $result->addLogLine($line3 = $this->buildLine());
        $result->addLogLine($line4 = $this->buildLine());
        $result->addLogLine($line5 = $this->buildLine());

        $this->assertSame(array($line3, $line4), $result->getLogLines());
    }

    public function test_getLogLines_shouldReturnEmptyArray_ByDefault()
    {
        $this->assertSame(array(), $this->buildResult(0, 0)->getLogLines());
    }

    public function test_getLogLines_shouldReturnAddedLogLines()
    {
        $result = $this->buildResult(4, 0);
        $result->addLogLine($line1 = $this->buildLine());
        $result->addLogLine($line2 = $this->buildLine());
        $result->addLogLine($line3 = $this->buildLine());

        $this->assertSame(array($line1, $line2, $line3), $result->getLogLines());
    }

    public function test_hasEnoughLogsInPage_ifLimitIsZero_ItShouldHaveEnoughLogsInstantly()
    {
        $this->assertHasEnoughLogsInPage($this->buildResult(0, 0));
    }

    public function test_hasEnoughLogsInPage_ifLimitIsHigherThanZeroAndNoLogs_ItShouldNotHaveEnoughLogs()
    {
        $this->assertHasNotEnoughLogsInPage($this->buildResult(1, 0));
    }

    public function test_hasEnoughLogsInPage_ifLimitIsHigherThanZeroAndHasSameAmountOfLogs_ItShouldHaveEnoughLogs()
    {
        $result = $this->buildResult(2, 0);
        $this->assertHasNotEnoughLogsInPage($result);

        $result->addLogLine($this->buildLine());
        $this->assertHasNotEnoughLogsInPage($result);

        $result->addLogLine($this->buildLine());
        $this->assertHasEnoughLogsInPage($result);
    }

    public function test_hasEnoughLogsInPage_withPaging()
    {
        $result = $this->buildResult(2, 1); // we need up to 4 results
        $this->assertHasNotEnoughLogsInPage($result);

        for ($i = 0; $i < 3; $i++) {
            $result->addLogLine($this->buildLine());
            $this->assertHasNotEnoughLogsInPage($result);
        }

        $result->addLogLine($this->buildLine());
        $this->assertHasEnoughLogsInPage($result);
    }

    private function assertHasNotEnoughLogsInPage(Result $result)
    {
        $this->assertFalse($result->hasEnoughLogsInPage());
    }

    private function assertHasEnoughLogsInPage(Result $result)
    {
        $this->assertTrue($result->hasEnoughLogsInPage());
    }

    private function buildLine()
    {
        return new Line('test');
    }

    private function buildResult($limitPerPage, $page)
    {
        return new Result($limitPerPage, $page);
    }

}
