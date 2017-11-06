<?php
/* Desc : web entrance
 * Para : 	
**/

session_start();

define('GAME_CODE', 'mgden');
define('GAME_CODE_LANG','mgden');
define('LANG', 'en-us');
define('TEMPLATE_PATH', '/');

require(dirname(realpath(__FILE__)) . '/../webroot/config/config.php');
require_once(MOBILE_GAME_ROOT . "/core.php");

function is_mobile()
{
    $agent      = strtolower($_SERVER['HTTP_USER_AGENT']);
    $is_pc      = (strpos($agent, 'windows nt')) ? true : false;
    $is_mac     = (strpos($agent, 'mac os')) ? true : false;
    $is_iphone  = (strpos($agent, 'iphone')) ? true : false;
    $is_android = (strpos($agent, 'android')) ? true : false;
    $is_ipad    = (strpos($agent, 'ipad')) ? true : false;
    if ($is_iphone) {
        return true;
    }
    if ($is_android) {
        return true;
    }
    if ($is_ipad) {
        return true;
    }
    if ($is_mac) {
        return false;
    }
    if ($is_pc) {
        return false;
    }

    return false;
}

$mb = is_mobile();
if ($mb) {
    OASCore::loadAction("Lpnwap");
}
else {
    OASCore::loadAction('lpn');
}
