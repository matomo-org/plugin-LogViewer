<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\tests\System;

use Piwik\Tests\Framework\TestCase\SystemTestCase;

/**
 * @group LogViewer
 * @group ApiTest
 * @group Plugins
 */
class ApiTest extends SystemTestCase
{
    /**
     * @dataProvider getApiForTesting
     */
    public function testApi($api, $params)
    {
        $this->runApiTests($api, $params);
    }

    public function getApiForTesting()
    {
        $apiToTest   = array();
        $apiToTest[] = array(
            array('LogViewer.getLogEntries', 'LogViewer.getAvailableLogReaders', 'LogViewer.getConfiguredLogReaders'),
            array(
                'testSuffix' => '',
            )
        );
        $apiToTest[] = array(
            'LogViewer.getLogEntries',
            array(
                'testSuffix'             => 'next_page',
                'otherRequestParameters' => array('page' => 1)
            )
        );
        $apiToTest[] = array(
            'LogViewer.getLogEntries',
            array(
                'testSuffix'             => 'query',
                'otherRequestParameters' => array('query' => 'dashboard')
            )
        );

        return $apiToTest;
    }

    public static function getOutputPrefix()
    {
        return '';
    }

    public static function getPathToTestDirectory()
    {
        return dirname(__FILE__);
    }

    public static function provideContainerConfigBeforeClass()
    {
        return array(
            'log.file.filename' => PIWIK_INCLUDE_PATH . '/plugins/LogViewer/tests/resources/piwik.log'
        );
    }

}