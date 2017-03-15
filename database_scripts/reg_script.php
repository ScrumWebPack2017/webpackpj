<?php
    //Проверить с GET потом сменить на POST
    //Пока что без ограничений на размер данных, пока просто на их наличие
    //Пока нет форм и JS скриптов, можно пользоваться URL в виде:
    //.../database_scripts/reg_script.php?password=123&name=Alex&phone=332228&email=alex&gender=male&country=UK
    require ("crypt.php"); //подключаем функции шифрования
    include "database_connect.php";
    if(!$_GET["password"] && !$_GET["email"]) { //проверяем был ли отправлен пароль и имейл (другое может быть и пустым)
        echo "'POST' data was unable to recieve";
        exit();
    }
    $email = $_GET["email"];
    if(empty($email) || empty($_GET["password"])) {
        echo "Были проблемы с паролем или имейлом";
        exit();
    }
    $search_query = "SELECT id FROM `User` WHERE `email` = '" . $email . "'";
    $result = mysql_query($search_query);
    $row = mysql_fetch_array($result);
    if($row[0] != 0) { //проверяем, если уже такой в базе
        echo "exists";
        exit();
    } else {
        $password = get_crypted_password($_GET["password"]);
        $phone = $_GET["phone"];
        $country = $_GET["country"];
        $gender = $_GET["gender"];
        $name = $_GET["name"];
        $insert_query = "INSERT INTO `User` (`email`, `password`, `name`, `gender`, `country`, `phone`) VALUES ('" . $email . "', '" . $password . "', '" . $name . "', '" . $gender . "', '" . $country . "', '" . $phone . "')";
        $result_insert = mysql_query($insert_query);
        if(!$result_insert) { //вдруг не удалось сделать запрос
            echo "Send error: " . mysql_error();
            exit();
        }
        echo "OK\n";
    }
?>