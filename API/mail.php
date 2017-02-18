<?php
require_once('../Dbconfig.php');
echo json_encode($user->mail($_GET['adress'], $_GET['from'], $_GET['subject'], $_GET['text']));
?>