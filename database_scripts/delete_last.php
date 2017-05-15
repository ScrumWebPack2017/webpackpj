<?php
    require ("database_framework.php");
    include "database_connect.php";

    $dater = date('i');
    if($dater == "0" || $dater == "00" || $dater == "30") {
        rrmdir("../serverdata");
        mkdir("../serverdata", 0700);
    }
?>