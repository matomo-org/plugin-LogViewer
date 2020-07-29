<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
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
class LineTest extends \PHPUnit\Framework\TestCase
{
    public function test__construct_shouldSaveContentInProperty()
    {
        $line = new Line('MyTestMessage');
        $this->assertSame('MyTestMessage', $line->content);
    }

}
