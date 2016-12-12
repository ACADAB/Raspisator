<?php
	require_once('../Dbconfig.php'); 	
	$temp = 0;
	if(isset($_GET["project_id"]))
	{
		$temp = $_GET["project_id"];
	}
	echo json_encode($user->get_lessons($temp));
?>