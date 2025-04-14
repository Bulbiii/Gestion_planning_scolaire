<<<<<<< HEAD
<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();

/*
$input = json_decode(file_get_contents('php://input'), true);


if ($input && isset($input['name']) && isset($input['mail'])) {
    $_SESSION['user']['name'] = $input['name'];
    echo json_encode(['success' => true, 'message' => 'Session mise à jour']);
}*/

echo json_encode($_SESSION);


//$_SESSION["role"]=$role; // teacher / student / admin
//$_SESSION["user"]=$user; // toutes les infos de la personne connectée
//$_SESSION['id']=$user['id']; // l'id de la personne

=======
<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();


echo json_encode($_SESSION);


//$_SESSION["role"]=$role; // teacher / student / admin
//$_SESSION["user"]=$user; // toutes les infos de la personne connectée
//$_SESSION['id']=$user['id']; // l'id de la personne

>>>>>>> 69d7f64ecb2e39623dc9414f0d1e472779ed4a05
?>