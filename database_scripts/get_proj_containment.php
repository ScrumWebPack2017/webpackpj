<?php
    include "database_connect.php";
    require ("database_framework.php");

    session_start();

    if(!$_SESSION["file"] && !$_SESSION["user"]) {
        echo "post error";
        exit();
    }

    $email = $_SESSION["user"];
    $name = $_SESSION["file"];
    $file = fopen("..\\userprojects\\" . $email . "\\" . $name, "r");

    $result = "";

    if ($file) {
        while (($line = fgets($file)) !== false) {
            $result .= $line . "?";
        }
        fclose($file);
        echo preg_replace( "/\r|\n/", "", $result );
    } else {
        echo "file error";
        exit();
    }
?>