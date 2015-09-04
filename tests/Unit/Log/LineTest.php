<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\tests\Unit\Log;
use Piwik\Plugins\LogViewer\Log\Line;

/**
 * @group LogViewer
 * @group Line
 * @group LineTest
 * @group Plugins
 */
class LineTest extends \PHPUnit_Framework_TestCase
{
    public function test__construct_shouldSaveContentInProperty()
    {
        $line = new Line('MyTestMessage');
        $this->assertSame('MyTestMessage', $line->content);
    }

}
