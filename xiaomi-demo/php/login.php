<?php
    header('content-type:text/html;charset="utf-8"');

    // 设置统一返回格式
    $responseData = Array("code" => 0,"message" => "");

    // 接收数据
    $username = $_POST["username"];
    $password = $_POST["password"];

    // 判断数据是否存在
    if(!$username){
        $responseData["code"] = 1;
        $responseData["message"] = "请输入用户名！";
        echo json_encode($responseData);
        exit;
    };
    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "请输入密码！";
        echo json_encode($responseData);
        exit;
    };

    // 链接数据库
    $link = mysql_connect("localhost","root","123456");
    if(!$link){
        $responseData["code"] = 3;
        $responseData["message"] = "链接数据库失败！";
        echo json_encode($responseData);
        exit;
    };

    // 设置字符集
    mysql_set_charset("utf-8");

    // 选择数据库
    mysql_select_db("xiaomi-user");

    // 准备mysql语句
    $sql1 = "select * from user_info where username='$username'";

    // 发送语句
    $res1 = mysql_query($sql1);

    if(!$res1){
        $responseData["code"] = 4;
        $responseData["message"] = "用户名未注册！";
        echo json_encode($responseData);
        exit;
    };

    $sql2 = "select * from user_info where password='{$password}'";

    $res2 = mysql_query($sql2);

    if(!$res2){
        $responseData["code"] = 5;
        $responseData["message"] = "密码错误！";
        echo json_encode($responseData);
        exit;
    }else{
        $responseData["code"] = 0;
        $responseData["message"] = "成功登陆！";
        echo json_encode($responseData);
        exit;
    }

?>