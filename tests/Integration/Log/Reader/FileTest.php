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
        $this->assertSame('WARNING CoreHome[2015-07-03 06:22:38] [082d8] /home/vagrant/www/piwik/plugins/CoreHome/Columns/UserId.php(69): Warning - Invalid argument supplied for foreach() - Piwik 3.0.0-b1 - Please report this message in the Piwik forums: http://forum.piwik.org (please do a search first as it might have been reported already)', $this->file->nextLine()->content);
        $this->assertSame('WARNING CoreUpdater[2015-07-03 00:20:14] [af14a] /home/vagrant/www/piwik/core/Updates/3.0.0-b1.php(182): Notice - Undefined index: idGoal - Piwik 3.0.0-b1 - Please report this message in the Piwik forums: http://forum.piwik.org (please do a search first as it might have been reported already)', $this->file->nextLine()->content);
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
