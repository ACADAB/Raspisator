<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->add_lesson($_POST['subject_id'], $_POST['teacher_id'], $_POST['grade_id']));
?>