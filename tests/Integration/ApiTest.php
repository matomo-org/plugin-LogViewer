<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\tests\Integration;

use Piwik\Config;
use Piwik\Db;
use Piwik\Plugins\LogViewer\API;
use Piwik\Plugins\LogViewer\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Mock\FakeAccess;

/**
 * @group LogViewer
 * @group ApiTest
 * @group Api
 * @group Plugins
 */
class ApiTest extends IntegrationTestCase
{
    /**
     * @var API
     */
    private $api;

    public function setUp(): void
    {
        parent::setUp();

        $this->api = API::getInstance();
        FakeAccess::clearAccess(true);
    }

    public function test_getConfiguredLogReader()
    {
        $this->setLogWriters(array('file', 'screen'));
        $this->assertSame(array('file'), $this->api->getConfiguredLogReaders());
    }

    public function test_getConfiguredLogReader_shouldThrowExceptionIfNotEnoughPermission()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('checkUserHasSuperUserAccess Fake exception');

        FakeAccess::clearAccess(false);
        $this->api->getConfiguredLogReaders();
    }

    public function test_getAvailableLogReaders()
    {
        $this->assertSame(array('file', 'database'), $this->api->getAvailableLogReaders());
    }

    public function test_getAvailableLogReaders_shouldThrowExceptionIfNotEnoughPermission()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('checkUserHasSuperUserAccess Fake exception');

        FakeAccess::clearAccess(false);
        $this->api->getAvailableLogReaders();
    }

    public function test_getLogEntries_shouldThrowExceptionIfNotEnoughPermission()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('checkUserHasSuperUserAccess Fake exception');

        FakeAccess::clearAccess(false);
        $this->api->getLogEntries();
    }

    public function test_getLogConfig_shouldThrowExceptionIfNotEnoughPermission()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('checkUserHasSuperUserAccess Fake exception');

        FakeAccess::clearAccess(false);
        $this->api->getLogConfig();
    }

    public function test_getLogConfig_shouldReturnLogConfig()
    {
        $config = $this->api->getLogConfig();

        $this->assertNotEmpty($config['log_level']);
        self::assertIsArray($config['log_writers']);
    }

    public function test_getLogEntries_nothingSpecified_shouldReturnAllLogs_AndFindSourceAutomatically()
    {
        $this->setLogWriters(array('file'));
        $this->assertCount(14, $this->api->getLogEntries($query = '', $source = false, $page = 0, $limitPerPage = 1000));
    }

    public function test_getLogEntries_paging()
    {
        $this->setLogWriters(array('file'));
        $this->assertCount(10, $this->api->getLogEntries($query = '', $source = false, $page = 0, $limitPerPage = 10));

        $this->assertCount(5, $this->api->getLogEntries($query = '', $source = false, $page = 0, $limitPerPage = 5));
        $this->assertCount(5, $this->api->getLogEntries($query = '', $source = false, $page = 1, $limitPerPage = 5));
        $this->assertCount(4, $this->api->getLogEntries($query = '', $source = false, $page = 2, $limitPerPage = 5));
        $this->assertCount(0, $this->api->getLogEntries($query = '', $source = false, $page = 3, $limitPerPage = 5));
    }

    public function test_getLogEntries_query_shouldOnyFindMatchingOnes()
    {
        $this->setLogWriters(array('file'));
        $this->assertCount(5, $this->api->getLogEntries($query = 'CoreUpdater'));
        $this->assertCount(4, $this->api->getLogEntries($query = 'Recoverable Error'));
        $this->assertCount(1, $this->api->getLogEntries($query = 'cache'));
        $this->assertCount(0, $this->api->getLogEntries($query = 'does not Match anything'));
    }

    /**
     * Use this method to return custom container configuration that you want to apply for the tests.
     * This configuration will override Fixture config and config specified in SystemTestCase::provideContainerConfig().
     *
     * @return array
     */
    public function provideContainerConfig()
    {
        return array(
            'log.file.filename' => PIWIK_INCLUDE_PATH . '/plugins/LogViewer/tests/resources/piwik.log',
            'Piwik\Access' => new FakeAccess()
        );
    }

}
