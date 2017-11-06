<?php 
/* Desc : web entrance
 * Para : 	
**/

session_start();

define('GAME_CODE','mgden');
define('GAME_CODE_LANG', 'mgden');
define('LANG','en-us');
define('TEMPLATE_PATH','/mgden/');

require(dirname(realpath(__FILE__)) . '/../webroot/config/config.php');
require_once( MOBILE_GAME_ROOT . "/core.php");

OASCore::loadAction();
