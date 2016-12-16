<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->add_lesson($_POST['subject'], $_POST['teach_id'], $_POST['grade_id']));
?>