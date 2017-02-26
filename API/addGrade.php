<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->add_grade($_POST['school_id'], $_POST['name'], $_POST['number']));
?>