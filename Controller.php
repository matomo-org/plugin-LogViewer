<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\LogViewer;

use Piwik\Common;
use Piwik\Piwik;

class Controller extends \Piwik\Plugin\ControllerAdmin
{
    public function index()
    {
        Piwik::checkUserHasSuperUserAccess();

        $limit = Common::getRequestVar('limit', 100, 'int');

        return $this->renderTemplate('index', array(
            'limit' => $limit
        ));
    }
}
