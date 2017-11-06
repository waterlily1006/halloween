<?php
session_start();
error_reporting(0);
require("../../frame/Vcode.class.php");
$code = new Vcode(99,33,5);
echo $code;
echo $_SESSION["code"];