<?php
    require ("database_framework.php");
    require ("crypt.php"); //подключаем функции шифрования
    include "database_connect.php";
    if(!$_POST["password"] && !$_POST["email"]) { //проверяем был ли отправлен пароль и имейл (другое может быть и пустым)
        echo "post fail";
        exit();
    }
    $email = $_POST["email"];
    if(empty($email) || empty($_POST["password"])) {
        echo "empty";
        exit();
    } else {
        if(!checkEmail($email)) {
            echo "wrong email";
            exit();
        } else {
            if(!checkPassword($_POST["password"])) {
                echo "wrong pass";
                exit();
            }
        }
    }
    if(checkForEmail($email)) {
        echo "exists";
        exit();
    } else {
        $password = get_crypted_password($_POST["password"]);
        $phone = (empty($_POST["phone"])) ? "NULL" : "'" . $_POST["phone"] . "'";
        $country = (empty($_POST["country"])) ? "NULL" : "'" . $_POST["country"] . "'";
        $gender = (empty($_POST["gender"])) ? "NULL" : "'" . $_POST["gender"] . "'";
        $name = (empty($_POST["name"])) ? "NULL" : "'" . $_POST["name"] . "'";
        $insert_query = "INSERT INTO `User` (`email`, `password`, `name`, `gender`, `country`, `phone`) 
            VALUES ('" . $email . "', '" . $password . "', " . $name . ", " . $gender . ", " . $country . ", " . $phone . ")";
        $result_insert = mysql_query($insert_query);
        if(!$result_insert) { //вдруг не удалось сделать запрос
            echo "not sent";
            exit();
        }
        echo "OK";
    }

    function checkEmail($email) {
        $pattern = '/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i';
        return (preg_match($pattern, $email));
    }

    function checkPassword($password) {
        $pattern = '/^[a-z0-9_-]{6,18}$/i';
        return (preg_match($pattern, $password));
    }
?>