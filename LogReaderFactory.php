<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer;

use Piwik\Config;
use Piwik\Container\StaticContainer;
use Piwik\Http\BadRequestException;
use Piwik\Plugins\LogViewer\Log\Reader\Database;
use Piwik\Plugins\LogViewer\Log\Reader\File;

class LogReaderFactory
{
    private $supportedLogReader = array('file', 'database');

    public function make($source)
    {
        if (empty($source)) {
            $source = $this->tryToDetectBestLogReader();
        }

        switch ($source) {
            case 'file':
                $testFilePath = '';
                try {
                    $testFilePath = StaticContainer::get('test.vars.logForReading');
                } catch (\Throwable $th) {
                    // Do nothing
                }
                $path = $testFilePath ?: StaticContainer::get('log.file.filename');

                return new File($path);

            case 'database':
                return new Database();

            default:
                throw new BadRequestException('Wrong source specified. Such log reader does not exist: ' . $source);
        }
    }

    public function getAvailableLogReaders()
    {
        return $this->supportedLogReader;
    }

    public function getConfiguredLogReaders()
    {
        $logWriters = Config::getInstance()->log['log_writers'];
        if (!is_array($logWriters)) {
            $logWriters = array($logWriters);
        }

        $configured = array();
        foreach ($logWriters as $key => $logWriter) {
            if (in_array($logWriter, $this->supportedLogReader)) {
                $configured[] = $logWriter;
            }
        }

        return $configured;
    }

    private function tryToDetectBestLogReader()
    {
        $logWriters = $this->getConfiguredLogReaders();

        if (count($logWriters) === 1) {
            return array_shift($logWriters);
        }

        throw new BadRequestException('No source specified, please specify one of: ' . implode(', ', $this->supportedLogReader));
    }
}
