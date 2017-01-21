<?php
	require_once('../Dbconfig.php');
	$user->save($_GET['p_id']);
	$file = '../excell/'.$_GET['p_id'].'.xlsx';
	header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
	header('Content-Transfer-Encoding:binary');
    header('Content-Disposition: attachment; filename="'.basename($file).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header("Pragma: no-cache");
    header('Content-Length: ' . filesize($file));
    readfile($file);
    exit;
?>