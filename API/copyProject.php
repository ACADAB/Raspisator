<?php
require_once('../Dbconfig.php');
echo json_encode($user->copy_project($_GET['id'], $_GET['name']));
?>