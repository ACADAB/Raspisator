<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->add_project($_POST['p_name'],$_POST['s_id'], $_POST['start'], $_POST['finish'], $_POST['lessons_per_day']));
?>