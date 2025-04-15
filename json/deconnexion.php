<<<<<<< HEAD
<?php
// Commencer la session
session_start();

// Supprimer toutes les données de session
session_unset();
session_destroy();

// Répondre avec succès
echo json_encode(['success' => true]);
=======
<?php
// Commencer la session
session_start();

// Supprimer toutes les données de session
session_unset();
session_destroy();

// Répondre avec succès
echo json_encode(['success' => true]);
>>>>>>> 69d7f64ecb2e39623dc9414f0d1e472779ed4a05
?>