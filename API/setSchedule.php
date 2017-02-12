<?php
/*
{
"school_id": 1,
"days": [
{
"date":"1999-02-11",
"ready": [true, false, true,false,true, true]
},
{
"date":"1999-03-11",
"ready": [true, false, true,false,true, true]
},
{
"date":"1999-04-11",
"ready": [true, false, true,false,true, true]
},
{
"date":"1999-05-11",
"ready": [true, false, true,false,true, true]
}
]
}
*/

	require_once('../Dbconfig.php'); 	

	$id = -1;
	if (isset($_SESSION['user_session'])){
		$id = $_SESSION['user_session'];
	}
	if (isset($_POST['user_id'])) {
		$id = $_POST['user_id'];
	}

	echo json_encode($user->set_schedule($_POST['schedule'], $id));
?>