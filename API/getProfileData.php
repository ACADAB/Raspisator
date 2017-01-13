<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->get_profile_data());
?>