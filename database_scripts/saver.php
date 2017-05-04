<?php
    require ("database_framework.php");
    include "database_connect.php";

    if(!$_GET["data"] && !$_GET["name"]) {
        echo "post fail";
        exit();
    }

    $file = fopen("..\\userprojects\\" . $_GET["name"], "w+");

    fwrite($file, $_GET["data"]);
    $date = date('Y-m-d-H-i-s');

    $insert_query = "UPDATE `Projects` SET `timer` = '" . $date . "' WHERE `path` = '" . $_GET["name"] . "'";
    $result_insert = mysql_query($insert_query);
    if(!$result_insert) {
        echo "not sent: " . mysql_error();
        exit();
    }
    echo $date;
?>