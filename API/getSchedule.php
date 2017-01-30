<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->get_user_schedule($_GET['user_id'], $_GET['start'], $_GET['finish']));
?>