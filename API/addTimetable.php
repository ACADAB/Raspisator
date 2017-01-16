<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->add_school_timetable($_POST['timetable'],$_POST['school_id']));
?>