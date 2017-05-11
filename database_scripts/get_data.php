<?php
    require ("database_framework.php");
    include "database_connect.php";

    session_start();

    if(isset($_SESSION["user"])) {
        $email = $_SESSION["user"];

        $select_query = "SELECT `User`.`email` as 'email', `User`.`name` as 'name', `User`.`phone` as 'phone', `User`.`gender` as 'gender', `User`.`country` as 'country' 
            FROM `User` WHERE `User`.`email` = '" . $email . "'";
        $q_result = mysql_query($select_query);
        if(!$q_result) {
            echo "Select error " . mysql_error();
            exit();
        }
        $row = mysql_fetch_array($q_result);
        $name = ($row['name'] == null || $row['name'] == 'NULL') ? "0" : $row['name'];
        $phone = ($row['phone'] == null || $row['phone'] == 'NULL') ? "0" : $row['phone'];
        $gender = ($row['gender'] == null || $row['gender'] == 'NULL') ? "0" : $row['gender'];
        $country = ($row['country'] == null || $row['country'] == 'NULL') ? "0" : $row['country'];
        $result = $row['email'] . "*" . $name . "*" . $phone . "*" . $gender . "*" . $country;
        echo $result;
    } else {
        echo "Error";
        exit();
    }
?>