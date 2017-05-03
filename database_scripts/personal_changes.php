<?php
    require ("database_framework.php");
    include "database_connect.php";

    if(!$_POST["name"] && !$_POST["gender"] && !$_POST["country"] && !$_POST["phone"]) {
        echo "post fail";
        exit();
    }

    $name = empty($_POST["name"]) ? "NULL" : $_POST["name"];
    $gender = empty($_POST["gender"]) ? "NULL" : $_POST["gender"];
    $country = empty($_POST["country"]) ? "NULL" : $_POST["country"];
    $phone = empty($_POST["phone"]) ? "NULL" : $_POST["phone"];
    if(!$_SESSION["user"]) {
        echo "session error";
        exit();
    }

    $mail = $_SESSION["user"];

    $update_query = "UPDATE `User` SET `name` = '". $name ."', `gender` = '". $gender ."', `country` = '". $country ."', `phone` = '". $phone ."'  WHERE `email` = '" . $mail . "'";
    $result_update = mysql_query($update_query);
    if(!$result_update) {
        echo "update error: " . mysql_error();
        exit();
    }

    echo "OK";
?>