<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->edit_project($_POST['p_id'],$_POST['p_name'], $_POST['start'], $_POST['finish'], $_POST['lessons_per_day']));
?>