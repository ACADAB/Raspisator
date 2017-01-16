<?php
	require_once('../Dbconfig.php'); 
	echo json_encode($user->set_role_user_school_relation($_POST['school_id'], $_POST['user_id'], $_POST['role_id'], $_POST['is_approved']));
?>