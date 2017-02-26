<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->add_subject($_POST['school_id'], $_POST['name']));
?>