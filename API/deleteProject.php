<?php
	require_once('../Dbconfig.php');
	$pid = -1; 
	if (isset($_POST['project_id'])){
		$pid = $_POST['project_id'];
	} else {
		$pid = $_GET['project_id'];
	}
	echo json_encode($user->delete_project($pid));
?>
