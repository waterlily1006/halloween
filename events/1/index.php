<?php
/**
 * Created by PhpStorm.
 * User: Baihuzi
 * Date: 16/7/22
 * Time: 10:36
 */
require(dirname(realpath(__FILE__)) . '/../../../webroot/config/config.php');

class Lang
{
    public function getLang()
    {
        return $this->getSysLang();
    }

    protected function getSysLang()
    {
        $lang = LANG;
        if (empty($lang)) {
            $lang = $this->getLangByServer();
        }
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

        require_once('../../../webroot/application/lib/data/Base.class.php');

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
        else if (strtolower($lang) == "tr") {
            $lang = "tr-tr";
        }
        else {
            $lang = "en-us";
        }

        return $lang;
    }

    public function is_mobile()
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
}

$act       = new Lang();
$lang      = $act->getLang();
$lang      = $lang ? $lang : 'en-us';
$is_mobile = $act->is_mobile();
if ($is_mobile) {
    $platform = 'wap';
}
else {
    $platform = 'web';
}

switch ($lang) {
    case 'ru-ru':
        $location = "//mgdru.oasgames.com/events/1/ru/{$platform}/";
        break;
    case 'de-de':
        $location = "//mgdde.oasgames.com/events/1/de/{$platform}/";
        break;
    case 'fr-fr':
        $location = "//mgdfr.oasgames.com/events/1/fr/{$platform}/";
        break;
    default:
        $location = "//mgden.oasgames.com/events/1/en/{$platform}/";
        break;
}
header("Location:" . $location);
exit;
