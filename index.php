<?php
session_start() ; // SESSION
if(!isset($_SESSION['role'])){
    header("Location: page_authentification.php");
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="vue/style/style.css">
    <title>Projet EDT</title>
    <link rel="icon" type="image/x-icon" href="vue/style/img/windowIcon.png">
</head>

<script src="lib/vars.lib.js"></script>
<script src="vue/lib.vue.js"></script> 
<script src="lib/gen_edt/gen_edt.js"></script>

<script src="lib/axios.min.js"></script>

<script src="vue/main.vue.js"></script>
<script src="vue/header.vue.js"></script>
<script src="vue/footer.vue.js"></script>
<script src="vue/timetable.vue.js"></script>
<script src="vue/note.vue.js"></script>
<script src="vue/generate.vue.js"></script>
<script src="vue/profil.vue.js"></script>
<script src="vue/create_user.vue.js"></script>

<script>
    <?php 
    $userId;
    if (isset($_SESSION["user"]["user_id"])){
        $userId = $_SESSION["user"]["user_id"];
    } else {
        $userId = $_SESSION["user"]["id_user"];
    }
    
    echo("const userId = " . $userId . ";");
    echo("const userTypeId = " . $_SESSION["id"] . ";");

    ?>

    function start_web(){
        create_main_vue();
    }
</script>

<body onload="start_web();"></body>

</html>