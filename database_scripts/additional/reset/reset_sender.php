<?php
    require ("../../database_framework.php");
    require ("../../crypt.php");
    include "../../database_connect.php";

    session_start();

    if(isset($_SESSION["userMail"]) && isset($_SESSION["userKey"])) {
        if(!$_POST["password"]) {
            echo "post fail";
            exit();
        }

        if(empty($_POST["password"])) {
            echo "empty";
            exit();
        } else {
            if(!checkPassFW($_POST["password"])) {
                echo "wrong pass";
                exit();
            }
        }

        $password = get_crypted_password($_POST["password"]);
        $email = $_SESSION["userMail"];

        $delete_query = "DELETE FROM `Reset` WHERE `email` = '" . $_SESSION["userMail"] . "' AND `keyTemp` = '" . $_SESSION["userKey"] . "'";
        $result_delete = mysql_query($delete_query);
        if(!$result_delete) {
            echo "Delete error: " . mysql_error();
            exit();
        }

        $update_query = "UPDATE `User` SET `password` = '" . $password . "' WHERE `email` = '" . $email . "'";
        $result = mysql_query($update_query);
        if(!$result) {
            echo "Update error: " . mysql_error();
            exit();
        }

        session_unset();
        session_destroy();

        echo "Success!";
    } else {
        echo "Critical Error";
    }
?>