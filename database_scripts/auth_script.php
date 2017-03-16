<?php
    require ("crypt.php"); //подключаем функции шифрования
    include "database_connect.php";
    if(!$_POST["password"] && !$_POST["email"]) {
        echo "post fail";
        exit();
    }
    if(empty($_POST["email"]) || empty($_POST["password"])) {
        echo "empty";
        exit();
    } else {
        if(!checkEmailPhone($_POST["email"])) {
            echo "wrong email";
            exit();
        } else {
            if(!checkPassword($_POST["password"])) {
                echo "wrong pass";
                exit();
            }
        }
    }
    $tmp_pass = get_crypted_password($_POST["password"]);
    $search_query = "SELECT name, phone, gender, country FROM `User` WHERE (`email` = '" . $_POST["email"] . "' OR `phone` = '" . $_POST["email"] . "') AND `password` = '". $tmp_pass ."'";
    $result = mysql_query($search_query);
    if(!$result) {
        echo "retrieve error";
        exit();
    }
    $count = 0;
    $send_to;
    while($row = mysql_fetch_array($result)) {
        ++$count;
        $send_to = array('name'=>$row["name"], 'email'=>$_POST["email"], 'phone'=>$row["phone"], 'gender'=>$row["gender"], 'country'=>$row["country"],);
    }
    if ($count > 1) {
        unset($send_to);
        echo "db duplicate";
        exit();
    } else {
        if ($count == 0) {
            echo "bad data";
            exit();
        }
    }
    session_start();
    $_SESSION["user"] = $_POST["email"];
    echo json_encode($send_to);

    function checkEmailPhone($email) {
        /*$pattern = '/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i';
        return (preg_match($pattern, $email));*/
        //тут еще нажо написать регулярку для телефона
        return true;
    }

    function checkPassword($password) {
        $pattern = '/^[a-z0-9_-]{6,18}$/i';
        return (preg_match($pattern, $password));
    }
?>