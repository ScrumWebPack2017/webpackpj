<?php
    require ("crypt.php"); //подключаем функции шифрования
    include "database_connect.php";
    require ("database_framework.php");

    if(!$_POST["password"] && !$_POST["email"]) {
        echo "post fail";
        exit();
    }
    if(empty($_POST["email"]) || empty($_POST["password"])) {
        echo "empty";
        exit();
    } else {
        if(!checkEmail($_POST["email"])) {
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
    if(contains($_POST["email"])){
        echo "error with ' symbol";
        exit();
    }
    $search_query = "SELECT checked, email, name, phone, gender, country FROM `User` WHERE `email` = '" . $_POST["email"] . "' AND `password` = '". $tmp_pass ."'";
    $result = mysql_query($search_query);
    if(!$result) {
        echo "retrieve error: " . mysql_error();
        exit();
    }
    $count = 0;
    $send_to;
    while($row = mysql_fetch_array($result)) {
        ++$count;
        $send_to = array('checked'=>$row["checked"], 'name'=>$row["name"], 'email'=>$row["email"], 'phone'=>$row["phone"], 'gender'=>$row["gender"], 'country'=>$row["country"],);
    }
    if ($count > 1) {
        unset($send_to);
        echo "db duplicate";
        exit();
    } else {
        if ($count == 0) {
            echo "Check the validity of input";
            exit();
        }
    }
    if($send_to['checked'] == "0" || $send_to['checked'] == 0) {
        echo "Confirm your mail";
        exit();
    }
    session_start();
    $_SESSION["user"] = $send_to['email'];
    $_SESSION["uname"] = ($send_to['name'] == "NULL" || $send_to['name'] == NULL) ? $send_to['email'] : $send_to['name'];
    echo json_encode($send_to);

    function checkEmail($email) {
        $patterne = '/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i';
        return (preg_match($patterne, $email));
    }

    function checkPassword($password) {
        $pattern = '/^[a-z0-9_-]{6,18}$/i';
        return (preg_match($pattern, $password));
    }
?>