<?php
    require ("database_framework.php");
    include "database_connect.php";

    session_start();

    if(!$_POST["email"] && !$_POST["name"] && !$_POST["country"] && !$_POST["phone"]) {
        echo "post fail";
        exit();
    }

    $email = $_POST["email"];
    $name = empty($_POST["name"]) ? "NULL" : $_POST["name"];
    $country = empty($_POST["country"]) ? "NULL" : $_POST["country"];
    $phone = empty($_POST["phone"]) ? "NULL" : $_POST["phone"];
    if(!isset($_SESSION["user"])) {
        echo "session error";
        exit();
    }

    $mail = $_SESSION["user"];

    $update_query = "UPDATE `User` SET `email` = '" . $email . "' `name` = '". $name ."', `country` = '". $country ."', `phone` = '". $phone ."'  WHERE `email` = '" . $mail . "'";
    $result_update = mysql_query($update_query);
    if(!$result_update) {
        echo "update error: " . mysql_error();
        exit();
    }

    $_SESSION["user"] = $email;

    echo "OK";
?>