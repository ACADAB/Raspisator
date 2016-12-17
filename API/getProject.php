<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->get_project($_GET['project_id']));
?>