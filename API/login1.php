<?php
require_once('../Dbconfig.php');
echo json_encode($user->login($_GET['name'], $_GET['password']));
?>