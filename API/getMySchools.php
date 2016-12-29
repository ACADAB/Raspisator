<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->get_my_schools());
?>