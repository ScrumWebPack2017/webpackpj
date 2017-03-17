<?php
    session_start();

    if(isset($_SESSION["user"])){
        echo "closing";
        session_unset();
        session_destroy();
    }
?>