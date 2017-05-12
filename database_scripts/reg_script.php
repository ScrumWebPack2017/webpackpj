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
        $image = $_POST["image"];
        $insert_query = "INSERT INTO `User` (`email`, `password`, `name`, `gender`, `country`, `phone`, `image`) 
            VALUES ('" . $email . "', '" . $password . "', " . $name . ", " . $gender . ", " . $country . ", " . $phone . ", '" . $image . "')";
        $result_insert = mysql_query($insert_query);
        if(!$result_insert) { //вдруг не удалось сделать запрос
            echo "not sent: " . mysql_error();
            exit();
        }
        $sel_query = "SELECT MAX(`id`) as 'max' FROM `User`";
        $result_sel = mysql_query($sel_query);
        if(!$result_sel) { //вдруг не удалось сделать запрос
            echo "not sent: " . mysql_error();
            exit();
        }
        $row = mysql_fetch_array($result_sel);
        $date = date('Y/m/d');
        $ins_query = "INSERT INTO `WorkTime` (`userid`, `date`) 
            VALUES ('" . $row['max'] . "', '" . $date . "')";
        $result_ins = mysql_query($ins_query);
        if(!$result_ins) { //вдруг не удалось сделать запрос
            echo "not sent: " . mysql_error();
            exit();
        }
        $string_url = "http://webpackpj.com/database_scripts/confirm_mail.php?email=" . $email;
        if(mail($email, "Password reset", "Hi, it`s WebPack.\nConfirm your account by following this link: \n" . $string_url)) {
            mkdir("../userprojects/" . $email, 0700);
            echo "OK";
        }
        else {
            echo "fault";
        }
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