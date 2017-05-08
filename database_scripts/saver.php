<?php
    require ("database_framework.php");
    include "database_connect.php";

    session_start();

    if(!$_POST["data"] && !$_SESSION["file"]) {
        echo "post fail";
        exit();
    }

    $file = fopen("..\\userprojects\\" . $_SESSION["user"] . "\\" . $_SESSION["file"], "w+");

    fwrite($file, $_POST["data"]);
    $date = date('Y/m/d H:i:s');

    $insert_query = "UPDATE `Projects` SET `timer` = '" . $date . "' WHERE `path` = '" . $_SESSION["file"] . "'";
    $result_insert = mysql_query($insert_query);
    if(!$result_insert) {
        echo "not sent: " . mysql_error();
        exit();
    }
    echo $date;
?>