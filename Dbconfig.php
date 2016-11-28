<?

session_start();
//phpinfo();
$ini = parse_ini_file("db_connection_default.ini");	

try{
	$ini = parse_ini_file("db_connection_default.ini");
	if (is_file("db_connection.ini")){
		$ini = parse_ini_file('db_connection.ini');
	}
}
catch(Exception $e){
	echo $e->getMessage();
}

try
{
     $DB_con = new PDO("mysql:host={$ini['host']};dbname={$ini['dbname']}",$ini['user'],$ini['pass']);
     $DB_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
     echo $e->getMessage();
}


include_once 'user.php';
$user = new USER($DB_con);

?>
