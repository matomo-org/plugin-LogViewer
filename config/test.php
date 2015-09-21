<?php

if (!empty($_GET['uitest'])) {
    // only apply this for ui tests
    return array(
        'log.file.filename' => PIWIK_INCLUDE_PATH . '/plugins/LogViewer/tests/resources/piwik.log'
    );
}

return array();