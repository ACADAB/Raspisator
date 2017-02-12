<?php
	require_once('../Dbconfig.php'); 

	$id = -1;
	if (isset($_SESSION['user_session'])){
		$id = $_SESSION['user_session'];
	}
	if (isset($_GET['user_id'])) {
		$id = $_GET['user_id'];
	}

	echo json_encode($user->get_user_schedule($id, $_GET['start'], $_GET['finish']));
?>