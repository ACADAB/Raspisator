<?php
	require_once('../Dbconfig.php'); 
	//echo 'data: ',$_POST['data'];

	//{"lessons":[{"isUsed":true,"index":3,"x":1,"y":2,"db_id":1,"color":"blue"},{"isUsed":true,"index":1,"x":3,"y":0,"db_id":2,"color":"yellow"},{"isUsed":true,"index":0,"x":2,"y":1,"db_id":3,"color":"red"},{"isUsed":true,"index":2,"x":4,"y":3,"db_id":4,"color":"blue"}],"table":{"table":[[-1,-1,-1,-1],[-1,-1,0,-1],[-1,2,-1,-1],[1,-1,-1,-1],[-1,-1,-1,3],[-1,-1,-1,-1]],"width":6,"height":4},"grades":["8E","9E","10E","11E"]}
	echo json_encode($user->save_project_data($_POST['project_id'],$_POST['data']));
?>