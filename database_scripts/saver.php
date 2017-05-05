<?php
    require ("database_framework.php");
    include "database_connect.php";

    if(!$_POST["data"] && !$_POST["name"]) {
        echo "post fail";
        exit();
    }

    $file = fopen("..\\userprojects\\" . $_POST["name"], "w+");

    fwrite($file, $_POST["data"]);
    $date = date('Y/m/d H:i:s');

    $insert_query = "UPDATE `Projects` SET `timer` = '" . $date . "' WHERE `path` = '" . $_POST["name"] . "'";
    $result_insert = mysql_query($insert_query);
    if(!$result_insert) {
        echo "not sent: " . mysql_error();
        exit();
    }
    echo $date;
?>