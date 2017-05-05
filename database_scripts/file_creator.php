<?php
    require ("database_framework.php");
    include "database_connect.php";

    session_start();

    if(!$_POST["data"] && !$_SESSION["user"]) {
        echo "post fail";
        exit();
    }

    $email = $_SESSION["user"];

    $date = date('Y-m-d-H-i-s');

    $path = $_POST["data"] . "-" . $date . ".webml";
    $file = fopen("..\\userprojects\\" . $path, "w+");

    $insert_query = "INSERT INTO `Projects` (`userid`, `name`, `path`, `timer`)
               SELECT DISTINCT `id`, '" . $_POST["data"] . "', '" . $path . "', '" . $date . "' FROM `User` WHERE `email` = '" . $email . "'";
    $result_insert = mysql_query($insert_query);
    if(!$result_insert) {
        echo "not sent: " . mysql_error();
        exit();
    }
    fclose($file);
    echo $path . "=" . $date;
?>