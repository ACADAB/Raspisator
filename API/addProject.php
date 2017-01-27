<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->add_project($_GET['p_name'],$_GET['s_id'], $_GET['start'], $_GET['finish'], $_GET['lessons_per_day']));
?>