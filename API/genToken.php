<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->generate_token());
?>