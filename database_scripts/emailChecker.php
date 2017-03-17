<?php
include "database_connect.php";
require ("database_framework.php");
if(!$_POST["email"]) {
    echo "post fail";
    exit();
} else {
    if (empty($_POST["email"])) {
        echo "empty";
        exit();
    }
}
if(checkEmail($_POST["email"])) echo "yes";
else echo "no";
?>