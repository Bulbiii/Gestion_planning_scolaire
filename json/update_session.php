<<<<<<< HEAD
<?php

session_start();

$input = json_decode(file_get_contents('php://input'), true);

if ($input) {
    
    $user_tmp=$_SESSION['user'];
    
    if (isset($input['mail'])) {
        $_SESSION['user']['mail'] = $input['mail'];
    }
    if (isset($input['password'])) {
        $_SESSION['user']['password'] = $input['password'];
    }

    echo json_encode([
        'success' => true,
        'message' => 'Données de session mises à jour',
        'reçu' => $input,
        'session' => $_SESSION
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Aucune donnée reçue'
    ]);
}

=======
<?php

session_start();

$input = json_decode(file_get_contents('php://input'), true);

if ($input) {
    
    $user_tmp=$_SESSION['user'];
    
    if (isset($input['mail'])) {
        $_SESSION['user']['mail'] = $input['mail'];
    }
    if (isset($input['password'])) {
        $_SESSION['user']['password'] = $input['password'];
    }

    echo json_encode([
        'success' => true,
        'message' => 'Données de session mises à jour',
        'reçu' => $input,
        'session' => $_SESSION
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Aucune donnée reçue'
    ]);
}

>>>>>>> 69d7f64ecb2e39623dc9414f0d1e472779ed4a05
?>