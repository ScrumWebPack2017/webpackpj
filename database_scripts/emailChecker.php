<?php
    require ("database_framework.php");
    include "database_connect.php";
    if(!$_POST["email"]) {
        echo "post fail";
        exit();
    } else {
        if (empty($_POST["email"])) {
            echo "empty";
            exit();
        }
    }
    if(checkForEmail($_POST["email"])){
        echo "no";
    } else {
        echo "yes";
    }
?>