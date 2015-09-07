<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\LogViewer\Log\Reader\Database;
use Piwik\Plugins\LogViewer\Log\Reader\File;
use Piwik\Config;
use Exception;

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
                $path = StaticContainer::get('log.file.filename');

                return new File($path);

            case 'database':
                return new Database();

            default:
                throw new Exception('Wrong source specifed. Such log reader does not exist: ' . $source);
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

        throw new Exception('No source specified, please specify one of: ' . implode(', ' , $this->supportedLogReader));
    }
}
