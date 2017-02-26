<?php
session_start();
//phpinfo();
$ini = parse_ini_file("db_connection_default.ini");	

try{
	if (/*file_exists("./db_connection.ini")*/true){//FIX ME
		$ini = parse_ini_file('db_connection.ini');
	}
	else {
		echo "Ini not passed!";
	}
}
catch(Exception $e){
	echo $e->getMessage();
}
try
{
     $DB_con = new PDO("mysql:host={$ini['host']};dbname={$ini['dbname']}; charset=utf8",$ini['user'],$ini['pass']);
     $DB_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $DB_con->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAMES utf8");
}
catch(PDOException $e)
{
     echo $e->getMessage();
}

define("LOCATION", $ini['location']);
include_once 'user.php';
$user = new USER($DB_con);

?>
