<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->add_school($_POST['school_name'], $_POST['lessons_per_day']));
?>