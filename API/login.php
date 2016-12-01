<?php
require_once('../Dbconfig.php');
echo json_encode($user->login($_POST['name'], $_POST['password']));
?>