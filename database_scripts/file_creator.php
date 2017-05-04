<?php
    require ("database_framework.php");
    include "database_connect.php";

    if(!$_POST["data"] && !$_SESSION["user"]) {
        echo "post fail";
        exit();
    }

    $email = $_SESSION["user"];
    if(empty($email)) {
        echo "empty";
        exit();
    }

    $date = date('Y-m-d-H-i-s');

    $path = $_GET["data"] . "-" . $date . ".webml";
    $file = fopen("..\\userprojects\\" . $path, "w+");

    $insert_query = "INSERT INTO `Projects` (`userid`, `name`, `path`)
               SELECT DISTINCT `id`, '" . $_POST["data"] . "', '" . $path . "' FROM `User` WHERE `email` = '" . $email . "'";
    $result_insert = mysql_query($insert_query);
    if(!$result_insert) {
        echo "not sent: " . mysql_error();
        exit();
    }

    echo $path;
?>