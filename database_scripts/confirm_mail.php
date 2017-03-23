<?php
    require ("database_framework.php");
    include "database_connect.php";

    if(!$_GET["email"]) {
        echo "Post fail";
        exit();
    }

    $email = $_GET["email"];

    if(empty($email)) {
        echo "Empty";
        exit();
    } else {
        if(!checkEmailFW($email)) {
            echo "Wrong email";
            exit();
        }
    }

    if(contains($email)){
        echo "error with ' symbol";
        exit();
    }

    $search_query = "SELECT 'found' FROM `User` WHERE `email` = '" . $email . "' AND `checked` = '1'";
    $result_sch = mysql_query($search_query);
    if(!$result_sch) {
        echo "retrieve error: " . mysql_error();
        exit();
    }

    $row = mysql_fetch_array($result_sch);

    if($row[0] != 0) {
        //echo "Restricted. Redirecting to main page...";///Изменить способ вывода ошибки так как
        header("refresh:2;url=../index.php");///Будет крашится страница
    }

    $update_query = "UPDATE `User` SET `checked` = '1' WHERE `email` = '" . $email . "'";
    $result = mysql_query($update_query);
    if(!$result) {
        echo "Update error: " . mysql_error();
        exit();
    }
    //echo "Confirmed. Redirecting to main page...";// Сдесь вывод вообще не нужен наверное
    header("refresh:1;url=../index.php");// Ошибка была не в пути, поменял обратно, с webpackpj.com
					//вообще не работало
?>