<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->get_school_data($_GET['school_id']));
?>