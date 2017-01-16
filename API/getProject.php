<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->get_project($_GET['project_id'], $_GET['return_school_data']));
?>