<?php
	function get_crypted_password($password){
		$cpy = md5($password);
		return $cpy;
	}

	function get_validity($password, $anotherone){
        $cpy = md5($password);
		return ($cpy == $anotherone);
	}
?>