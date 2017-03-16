<?php
include "database_connect.php";

function checkForEmail($email) {
    $search_query = "SELECT id FROM `User` WHERE `email` = '" . $email . "'";
    $result = mysql_query($search_query);
    $row = mysql_fetch_array($result);
    if($row[0] != 0) {
        return true;
    }
    return false;
}
?>