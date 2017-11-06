<?php
/**
 * Created by PhpStorm.
 * User: Baihuzi
 * Date: 16/7/22
 * Time: 10:36
 */
require(dirname(realpath(__FILE__)) . '/../../webroot/config/config.php');

class Lang
{
    public function getLang()
    {
        return $this->getSysLang();
    }
    
    protected function getSysLang()
    {
        
        $lang = $this->getLangByServer();
        // get lang from cookie
        if (empty($lang)) {
            $lang = $_COOKIE[COOKIE_KEY_SYS_LANGUAGE] ? $_COOKIE[COOKIE_KEY_SYS_LANGUAGE] : false;
        }
        
        // get lang from ip
        if (empty($lang)) {
            $lang = $this->getLangByIp();
        }
        
        // get lang from browser
        if (empty($lang)) {
            global $_BROWSER_LANGUAGE_LIST;
            $lang = commonFunc::get_browser_language();
            $lang = strtolower($lang);
            $lang = $_BROWSER_LANGUAGE_LIST[$lang];
        }
        
        return $lang;
    }
    
    private function getLangByIp()
    {
        
        require_once('../webroot/application/lib/data/Base.class.php');
        
        global $_COUNTRY_CODE_LANG_LIST;
        
        $ip  = commonFunc::get_client_ip();
        $url = 'http://www.oasgames.com/service/geoip/?ip=' . $ip;
        $rs  = BaseAction::makeRequest($url, array());
        $rs  = json_decode($rs, true);
        if ($rs['status'] == 'ok') {
            $country_code = $rs['val']['country_code'];
            if ($_COUNTRY_CODE_LANG_LIST[$country_code]) {
                return $_COUNTRY_CODE_LANG_LIST[$country_code];
            }
        }
        
        return false;
    }
    
    public function getLangByServer()
    {
        $langs = preg_split("/[,|;]/", $_SERVER['HTTP_ACCEPT_LANGUAGE']);
        $lang  = $langs[1];
        if (strtolower($lang) == "ru") {
            $lang = 'ru-ru';
        }
        else if (strtolower($lang) == "de") {
            $lang = "de-de";
        }
        else if (strtolower($lang) == "fr") {
            $lang = "fr-fr";
        }
        else {
            $lang = "en-us";
        }
        
        return $lang;
    }
}

$act  = new Lang();
$lang = $act->getLang();
$lang = $lang ? $lang : 'en-us';

switch ($lang) {
    case 'ru-ru':
        $location = "//mgden.oasgames.com/bind/ru";
        break;
    case 'de-de':
        $location = "//mgden.oasgames.com/bind/de";
        break;
    case 'fr-fr':
        $location = "//mgden.oasgames.com/bind/fr";
        break;
    default:
        $location = "//mgden.oasgames.com/bind/en";
        break;
}

/*switch ($lang) {
    case 'ru-ru':
        $location = "//mobile.test.oasgames.com/mgden/bind/ru";
        break;
    case 'de-de':
        $location = "//mobile.test.oasgames.com/mgden/bind/de";
        break;
    case 'fr-fr':
        $location = "//mobile.test.oasgames.com/mgden/bind/fr";
        break;
    default:
        $location = "//mobile.test.oasgames.com/mgden/bind/en";
        break;
}*/

header("Location:" . $location);
exit;
