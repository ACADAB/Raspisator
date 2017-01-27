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
	echo json_encode($user->set_schedule($_POST['schedule']));
?>