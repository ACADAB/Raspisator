<?php
require_once('../Dbconfig.php');
echo json_encode($user->copy_project($_POST['id']));
?>