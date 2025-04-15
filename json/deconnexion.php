<?php
// Commencer la session
session_start();

// Supprimer toutes les données de session
session_unset();
session_destroy();

// Répondre avec succès
echo json_encode(['success' => true]);
?>