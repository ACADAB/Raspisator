<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->add_project($_POST['p_name']));
?>