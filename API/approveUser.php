<?php
	require_once('../Dbconfig.php'); 
	$user->approve_user($_GET['id'],$_GET['token']);
?>