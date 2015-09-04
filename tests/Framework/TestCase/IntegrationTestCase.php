<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\tests\Framework\TestCase;

use Piwik\Config;

/**
 * @group LogViewer
 * @group ApiTest
 * @group Api
 * @group Plugins
 */
class IntegrationTestCase extends \Piwik\Tests\Framework\TestCase\IntegrationTestCase
{
    private $backupLogWriter;

    public function setUp()
    {
        parent::setUp();

        // we make sure to not change any actual config
        $this->backupLogWriter = Config::getInstance()->log['log_writers'];
    }

    public function tearDown()
    {
        $this->setLogWriters($this->backupLogWriter);
        parent::tearDown();
    }

    protected function setLogWriters($writer)
    {
        $log = Config::getInstance()->log;
        $log['log_writers'] = $writer;
        Config::getInstance()->log = $log;
    }

}
