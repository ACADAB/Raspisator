<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->add_school($_GET['school_name']));
?>