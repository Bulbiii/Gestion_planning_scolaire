<?php
include "db/db_connect.php";
include "crud.php";
include "utilisateur.php";

print_r(selectAll_courses($conn));


include "db/db_disconnect.php";
?>