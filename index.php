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
</head>

<script src="lib/vars.lib.js"></script>
<script src="vue/lib.vue.js"></script> 

<script src="vue/main.vue.js"></script>
<script src="vue/header.vue.js"></script>
<script src="vue/footer.vue.js"></script>
<script src="vue/timetable.vue.js"></script>
<script src="vue/note.vue.js"></script>

<script>
    function start_web(){
        create_main_vue();
    }
</script>

<body onload="start_web();"></body>

</html>