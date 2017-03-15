<?php
//Соединяемся с базой, если удачно, то выбираем таблицу
$server = "localhost";
$username = "root";
$pass = "";
$db_link = mysql_connect($server, $username, $pass);
if(!$db_link) {
    echo "Connection error: " . mysql_error();
    exit();
}
$db_selected = mysql_select_db("WebPackDB", $db_link);
if (!$db_selected) {
    echo "Error while selecting DB : " . mysql_error();
    exit();
}
echo "OK\n";
?>