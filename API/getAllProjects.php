<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->get_all_projects());
?>