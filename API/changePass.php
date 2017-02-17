<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->change_pass($_POST['oldpass'], $_POST['newpass']));
?>