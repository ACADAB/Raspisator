<?php
require_once('../Dbconfig.php');
$name = "Guest";

if ($user->is_loggedin()['is_loggedin']){
	$name = $_SESSION['user_name'];
}

echo json_encode(['name'=>$name]);
?>