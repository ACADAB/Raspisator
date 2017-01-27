<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->add_school($_GET['school_name'], $_GET['lessons_per_day']));
?>