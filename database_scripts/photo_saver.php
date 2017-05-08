<?php
    include 'database_connect.php';
    require ("database_framework.php");
    session_start();

    $img = $_POST['img'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $file = "..//userprojects//" . $_SESSION["user"] . "//" . $_SESSION["file"] . '.png';
    $path = "userprojects/" . $_SESSION["user"] . "/" . $_SESSION["file"] . '.png';
    $update_query = "UPDATE `Projects` SET `image` = '" . $path . "' WHERE `userid` = (SELECT DISTINCT `id` FROM `User` 
                WHERE `email` = '" . $_SESSION["user"] . "') AND `path` = '" .  $_SESSION["file"] . "'";
    $update_data = mysql_query($update_query);
    if(!$update_data) {
        echo "retrieve error: " . mysql_error();
        exit();
    }
    $op = fopen($file, "w");
    fputs($op, $data);
    fclose($op);
    echo "OK";
?>