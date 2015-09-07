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

    private $pos = 0;
    private $filesize = 0;
    private $buffer = array();

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

    /**
     * Reads latest log lines first.
     *
     * @return Line|void  Returns null once no more log lines available
     */
    public function nextLine()
    {
        if (!isset($this->handle)) {
            $this->handle   = fopen($this->path, 'r');
            $this->filesize = filesize($this->path);
        }

        if ($this->isLastLineToRead()) {
            $this->closeHandle();
            return;
        }

        $line = $this->readline();

        return new Line($line);
    }

    private function isLastLineToRead()
    {
        $hasNoMoreLines = !$this->areMultipleLinesInBuffer();
        $isFileWithoutContent = empty($this->filesize);
        $moreCharReadThanNeeded = $this->pos > $this->filesize;

        return $hasNoMoreLines && ($moreCharReadThanNeeded || $isFileWithoutContent);
    }

    private function areMultipleLinesInBuffer()
    {
        return count($this->buffer) > 1;
    }

    private function readline()
    {
        while (true) {
            if ($this->areMultipleLinesInBuffer()) {
                return array_pop($this->buffer);
            }

            if ($this->isLastLineToRead()) {
                return array_pop($this->buffer);
            }

            $content = $this->readManyBytesFromFile();

            if (isset($this->buffer[0])) {
                $content .= $this->buffer[0];
            }

            $this->buffer = explode(PHP_EOL, $content);
        }
    }

    private function readManyBytesFromFile()
    {
        $bufferSize = 4096;
        $this->pos += $bufferSize;

        if ($this->pos < $this->filesize && ($this->pos + $bufferSize) > $this->filesize) {
            // we have not reached the end of file but will in next run. Read directly till the end
            $missingBytesTillBeginning = $this->filesize - $this->pos;
            $bufferSize += $missingBytesTillBeginning;
            $this->pos  += $missingBytesTillBeginning;
        }

        fseek($this->handle, $this->pos * -1, SEEK_END);
        return fread($this->handle, $bufferSize);
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
