<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->set_project_lesson_relation($_POST['pair_id'], $_POST['project_id']));
?>