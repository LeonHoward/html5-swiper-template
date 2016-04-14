<?php 

	session_start();

	// for debug use $_GET["param"]
	// http://localhost/luolai-h5-20151205/db/addplayer1.php?sex=boy
    // $_SESSION['openid']   = 'o1zitjlK5QY7rH113wDe2f96ThUtOw';
    // $_SESSION['img']      = 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLBUibh2dXOLU3DkiblnVLNCfOb6D6ViawSD8mtPSFl86lVg59cdSIZ7u40lBLPr3ibvVc1xynrpn2U2UQ/0';
    // $_SESSION['nickname'] = 'coton_chen';
    // $player1sex           = $_GET['sex'];

	

	include_once 'connect.php';

	// params
	$player1openid     = $_SESSION['openid'];
	$player1headimgurl = $_SESSION['img'];
	$player1nickname   = $_SESSION['nickname'];
	$player1sex        = $_POST['sex'];
	$player1adate      = date("Y-m-d H:i:s",time());

	if ($conn)
	{
		$del_query = "DELETE FROM user WHERE player1openid = '$player1openid'";
		mysqli_query($conn , $del_query) or die("Error in query: $query. ".mysql_error());

		$query = "INSERT INTO user (player1openid, player1headimgurl, player1nickname, player1sex, player1adate) VALUES('$player1openid', '$player1headimgurl', '$player1nickname', '$player1sex', '$player1adate')";
		mysqli_query($conn , $query) or die("Error in query: $query. ".mysql_error());
	}else
	{
		echo 'database is disconnect!';
	}

	mysqli_close($conn);
?>﻿