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
use Piwik\Plugins\LogViewer\Log\Reader\File;
use Piwik\Plugins\LogViewer\Log\Reader\Database;
use Piwik\Plugins\LogViewer\LogReaderFactory;
use Piwik\Plugins\LogViewer\tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group LogViewer
 * @group LogReaderFactory
 * @group LogReaderFactoryTest
 * @group Plugins
 */
class LogReaderFactoryTest extends IntegrationTestCase
{
    /**
     * @var LogReaderFactory
     */
    private $factory;

    public function setUp()
    {
        parent::setUp();

        $this->factory = new LogReaderFactory();
    }

    public function test_getConfiguredLogReader_NoLogWriterConfigured()
    {
        $this->setLogWriters(array());
        $this->assertSame(array(), $this->factory->getConfiguredLogReader());
    }

    public function test_getConfiguredLogReader_shouldNotRemoveAny_IfAllAreValid()
    {
        $this->setLogWriters(array('file', 'database'));
        $this->assertSame(array('file', 'database'), $this->factory->getConfiguredLogReader());

        $this->setLogWriters(array('file'));
        $this->assertSame(array('file'), $this->factory->getConfiguredLogReader());
    }

    public function test_getConfiguredLogReader_shouldIgnoreScreenAsItIsNotSupportedReader()
    {
        $this->setLogWriters(array('screen', 'file', 'database'));
        $this->assertSame(array('file', 'database'), $this->factory->getConfiguredLogReader());
    }

    public function test_getConfiguredLogReader_WrongLogWriterFormat()
    {
        $this->setLogWriters('test');
        $this->assertSame(array(), $this->factory->getConfiguredLogReader());
    }

    public function test_make_shouldMakeRequested_LogReader()
    {
        $reader = $this->factory->make('file');
        $this->assertTrue($reader instanceof File);

        $reader = $this->factory->make('database');
        $this->assertTrue($reader instanceof Database);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Wrong source specifed. Such log reader does not exist: notSupporTed
     */
    public function test_make_shouldThrowException_IfNotSupportedReaderRequested()
    {
        $this->factory->make('notSupporTed');
    }

    public function test_make_shouldBeAbleToDetectSourceAutomatically_IfOnlyOneReaderConfiguredAndNoneSpecified()
    {
        $this->setLogWriters(array('file'));
        $reader = $this->factory->make(false);
        $this->assertTrue($reader instanceof File);

        $this->setLogWriters(array('database'));
        $reader = $this->factory->make(false);
        $this->assertTrue($reader instanceof Database);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage No source specified, please specify one of: file, database
     */
    public function test_make_shouldThrowException_IfNoSourceSpecified_AndNoWriterConfigured()
    {
        $this->setLogWriters(array());
        $this->factory->make(false);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage No source specified, please specify one of: file, database
     */
    public function test_make_shouldThrowException_IfNoSourceSpecified_AndManyWritersConfigured()
    {
        $this->setLogWriters(array('file', 'database'));
        $this->factory->make(false);
    }


}
