<?php
	require_once('../Dbconfig.php'); 
	$s_id = -1;

	if (isset($_GET['school_id'])){
		$s_id = $_GET['school_id'];
	};

	echo json_encode($user->get_my_roles($s_id));
?>
