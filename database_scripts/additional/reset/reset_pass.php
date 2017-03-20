<?php
    require ("../../crypt.php");
    require ("../../database_framework.php");
    include "../../database_connect.php";

    if(!$_GET["email"] && !$_GET["keyt"]) {
        echo "Post fail";
        exit();
    }

    $email = $_GET["email"];

    if(empty($email) || empty($_GET["keyt"])) {
        echo "Empty";
        exit();
    } else {
        if(!checkEmailFW($email)) {
            echo "Wrong email";
            exit();
        }
    }

    $keytemp = $_GET["keyt"];

    if(!getKey($email, $keytemp)) {
        echo "Restricted";
        exit();
    }

    session_start();

    $_SESSION["userMail"] = $email;
    $_SESSION["userKey"] = $keytemp;

    header("Location: reset.html");
?>