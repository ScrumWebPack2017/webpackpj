<?php
    require ("../../database_framework.php");
    require ("../../crypt.php");
    include "../../database_connect.php";

    if(!$_POST["email"]) { //проверяем был ли отправлен пароль и имейл (другое может быть и пустым)
        echo "post fail";
        exit();
    }

    $email = $_POST["email"];

    if(empty($email)) {
        echo "empty";
        exit();
    } else {
        if(!checkEmailFW($email)) {
            echo "wrong email";
            exit();
        } else {
            if(!checkForEmail($email)) {
                echo "nexist";
                exit();
            }
        }
    }

    $keyt = keyGenerator();

    if(checkForKey($email)) {
        $delete_query = "DELETE FROM `Reset` WHERE `email` = '" . $email . "'";
        $result_delete = mysql_query($delete_query);
        if(!$result_delete) {
            echo "Delete error: " . mysql_error();
            exit();
        }
    }

    $insert_query = "INSERT INTO `Reset` (`email`, `keyTemp`)
                VALUES ('" . $email . "', '" . $keyt . "')";
    $result_insert = mysql_query($insert_query);
    if(!$result_insert) {
        echo "not sent: " . mysql_error();
        exit();
    }
    $string_url = "http://webpackpj.com/database_scripts/additional/reset/reset_pass.php?email=" . $email . "&keyt=" . $keyt;
    if(mail($email, "Password reset", "Hi, it`s WebPack.\nWe got your message about password resetting. Follow the link to reset the password\n" . $string_url)) {
            echo "We have reset your password. Check your email.";
    }
    else
    {
        echo "fault";
    }

?>