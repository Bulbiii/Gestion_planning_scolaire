<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();


echo json_encode($_SESSION);


//$_SESSION["role"]=$role; // teacher / student / admin
//$_SESSION["user"]=$user; // toutes les infos de la personne connectée
//$_SESSION['id']=$user['id']; // l'id de la personne

?>