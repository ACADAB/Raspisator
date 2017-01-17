<?php
	require_once('../Dbconfig.php'); 	
	$temp = 0;
	if(isset($_GET["school_id"]))
	{
		$temp = $_GET["school_id"];
	}
	echo json_encode($user->get_school_lessons($temp));
?>