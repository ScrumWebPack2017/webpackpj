<?php
    include "database_connect.php";
    require ("database_framework.php");

    session_start();

    if(!$_POST["filename"] && !$_SESSION["user"]) {
        echo "post error";
        exit();
    }

    $email = $_SESSION["user"];


    //$result = "";

/*    if ($file) {
        while (($line = fgets($file)) !== false) {
            $result .= $line . "?";
        }
        fclose($file);*/
        $_SESSION["file"] = $_POST["filename"];
        echo "OK";
/*        echo preg_replace( "/\r|\n/", "", $result );
    } else {
        echo "file error";
        exit();
    }*/
?>