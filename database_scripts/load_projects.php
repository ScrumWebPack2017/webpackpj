<?php
    include "database_connect.php";
    require ("database_framework.php");

    session_start();

    $email = $_SESSION["user"];

    $search_query = "SELECT `Projects`.`path` as 'path', `Projects`.`timer` as 'timer', `Projects`.`image` as 'image' 
          FROM `User`, `Projects` WHERE `User`.`email` = '" . $email . "' AND `User`.`id` = `Projects`.`userid`";
    $result = mysql_query($search_query);
    if(!$result) {
        echo "retrieve error: " . mysql_error();
        exit();
    }
    $send_to = "";
    while($row = mysql_fetch_array($result)) {
        $send_to .= $row["path"] . "=" . $row["timer"] . "=" . $row["image"]. "&";
    }

    echo $send_to;
?>