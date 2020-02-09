<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\tests\Integration\Log\Reader;

use Piwik\Common;
use Piwik\Date;
use Piwik\Db;
use Piwik\Plugins\LogViewer\Log\Line;
use Piwik\Plugins\LogViewer\Log\Reader\Database;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group LogViewer
 * @group Database
 * @group DatabaseTest
 * @group Plugins
 */
class DatabaseTest extends IntegrationTestCase
{
    /**
     * @var Database
     */
    private $dbReader;

    public function setUp(): void
    {
        parent::setUp();

        $this->dbReader = new Database();
    }

    public function test_nextLine_shouldReturnAnInstanceOfLine()
    {
        $this->createManyLogEntries(2);
        $line = $this->dbReader->nextLine();

        $this->assertTrue($line instanceof Line);
        $this->assertNotEmpty($line);
    }

    public function test_nextLine_tryToReadFirstLines_newestFirst()
    {
        $this->createManyLogEntries(10);
        $this->assertSame('DEBUG Piwik\Common[2015-08-19 12:39:02] [93d35] Test Message 10', $this->dbReader->nextLine()->content);
        $this->assertSame('DEBUG Piwik\Common[2015-08-19 12:39:02] [93d35] Test Message 9', $this->dbReader->nextLine()->content);
    }

    public function test_nextLine_shouldReturnNullOnceEndOfFileReached()
    {
        $this->createManyLogEntries(14);

        for ($i = 0; $i < 14; $i++) {
            $this->assertNotEmpty($this->dbReader->nextLine());
        }

        $this->assertNull($this->dbReader->nextLine());
    }

    public function test_nextLine_shouldAutomaticallyFetch100MoreEntriesWithoutMissingSome_Whenever100WereRead_AndReturnNewestFirst()
    {
        $this->createManyLogEntries(241);

        for ($i = 241; $i > 0; $i--) {
            $this->assertSame('DEBUG Piwik\Common[2015-08-19 12:39:02] [93d35] Test Message ' . $i, $this->dbReader->nextLine()->content);
        }

        $this->assertNull($this->dbReader->nextLine());
    }

    private function createManyLogEntries($numLogEntries)
    {
        $date = Date::factory('2014-01-01 01:00:00');

        for ($i = 1; $i <= $numLogEntries; $i++) {
            $date->subSeconds(1);
            $this->createLogEntry("DEBUG Piwik\Common[2015-08-19 12:39:02] [93d35] Test Message " . $i, $date->getDatetime());
        }
    }

    private function createLogEntry($message, $time, $severity = 'DEBUG', $tag = '2c46')
    {
        $sql = sprintf(
            'INSERT INTO %s (tag, timestamp, level, message) VALUES (?, ?, ?, ?)',
            Common::prefixTable('logger_message')
        );

        Db::query($sql, array($tag, $time, $severity, $message));
    }


}
