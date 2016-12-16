<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->delete_project($_POST['project_id']));
?>