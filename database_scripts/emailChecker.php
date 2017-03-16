<?php
include "database_connect.php";

    $email = $_POST['email'];
    $search_query = "SELECT id FROM `User` WHERE `email` = '" . $email . "'";
    $result = mysql_query($search_query);
    $row = mysql_fetch_array($result);
    if($row[0] != 0) {
        echo "no";
    } else
        echo "yes";

?>