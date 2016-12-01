<?php
//header("Content-type: text/html; charset=utf-8");

require_once('../Dbconfig.php');
//var_dump($_POST);
echo json_encode($user->register($_POST['name'], $_POST['uname'],$_POST['umail'], $_POST['password']));
?>