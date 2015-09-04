<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\tests\Integration\Log\Reader;

use Piwik\Plugins\LogViewer\Log\Line;
use Piwik\Plugins\LogViewer\Log\Reader\File;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group LogViewer
 * @group File
 * @group FileTest
 * @group Plugins
 */
class FileTest extends IntegrationTestCase
{
    /**
     * @var File
     */
    private $file;

    public function setUp()
    {
        parent::setUp();

        $this->file = $this->createFile(PIWIK_INCLUDE_PATH . '/plugins/LogViewer/tests/resources/piwik.log');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Specified path to log file does not exist: /not/exisTinG/Path.log
     */
    public function test_construct_shouldThrowException_IfPathDoesNotExist()
    {
        $this->createFile('/not/exisTinG/Path.log');
    }

    public function test_nextLine_shouldReturnAnInstanceOfLine()
    {
        $line = $this->file->nextLine();

        $this->assertTrue($line instanceof Line);
        $this->assertNotEmpty($line);
    }

    public function test_nextLine_tryToReadFirstLines()
    {
        $this->assertSame('WARNING Dashboard[2015-05-19 04:45:40] [2c4ce] /home/vagrant/www/piwik/core/Plugin/Widget.php(51): Recoverable Error - Argument 1 passed to Piwik\Plugin\Widget::configureWidgetsList() must be an instance of Piwik\Widget\WidgetsList, instance of Piwik\WidgetsList given, called in /home/vagrant/www/piwik/core/WidgetsList.php on line 122 and defined - Piwik 2.13.1 - Please report this message in the Piwik forums: http://forum.piwik.org (please do a search first as it might have been reported already)', $this->file->nextLine()->content);
        $this->assertSame('WARNING Live[2015-05-19 04:45:41] [2c4ce] /home/vagrant/www/piwik/plugins/Live/Widgets/GetVisitorProfilePopup.php(34): Recoverable Error - Argument 1 passed to Piwik\Plugins\Live\Widgets\GetVisitorProfilePopup::configureWidgetsList() must be an instance of Piwik\Widget\WidgetsList, instance of Piwik\WidgetsList given, called in /home/vagrant/www/piwik/core/WidgetsList.php on line 122 and defined - Piwik 2.13.1 - Please report this message in the Piwik forums: http://forum.piwik.org (please do a search first as it might have been reported already)', $this->file->nextLine()->content);
    }

    public function test_nextLine_shouldReturnNullOnceEndOfFileReached()
    {
        for ($i = 0; $i < 14; $i++) {
            $this->assertNotEmpty($this->file->nextLine());
        }

        $this->assertNull($this->file->nextLine());
    }

    private function createFile($path)
    {
        return new File($path);
    }

}
