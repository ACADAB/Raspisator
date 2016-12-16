<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->set_project_lesson_relation($_GET['pair_id'], $_GET['project_id']));
?>