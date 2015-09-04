<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer\Log\Reader;

use Piwik\Plugins\LogViewer\Log\Line;
use Piwik\Plugins\LogViewer\Log\Reader;
use Exception;

class File implements Reader
{
    private $path;

    private $handle;

    public function __construct($path)
    {
        if (!file_exists($path)) {
            throw new \Exception('Specified path to log file does not exist: ' . $path);
        }

        if (!is_readable($path)) {
            throw new \Exception('Specified path to log file is not readable: ' . $path);
        }

        $this->path = $path;
    }

    public function nextLine()
    {
        if (!isset($this->handle)) {
            $this->handle = fopen($this->path, 'r');
        }

        if (($buffer = fgets($this->handle)) !== false) {
            return new Line(trim($buffer));
        }

        if (!feof($this->handle)) {
            throw new Exception("Unexpected read next line error. We haven't reached end of file yet but stopped reading lines");
        }

        $this->closeHandle();
    }

    public function __destruct()
    {
        $this->closeHandle();
    }

    private function closeHandle()
    {
        if (isset($this->handle)) {
            fclose($this->handle);
            $this->handle = null;
        }
    }
}
