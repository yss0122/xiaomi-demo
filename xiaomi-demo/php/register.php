<?php
    header('content-type:text/html;charset="utf-8"');

    // 规定统一返回格式
    $responseData = Array("code" => 0,"message" => "");

    // 接收数据
    $username = $_POST["username"];
    $password = $_POST["password"];
    $repassword = $_POST["repassword"];
    $createTime = $_POST["createTime"];

    // 验证数据是否存在
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
    if($repassword != $password){
        $responseData["code"] = 3;
        $responseData["message"] = "确认密码填写错误！";
        echo json_encode($responseData);
        exit;
    };

    // 链接数据库
    $link = mysql_connect("localhost", "root", "123456");

    // 链接数据库是否成功
    if(!$link){
        $responseData["code"] = 4;
        $responseData["message"] = "数据库链接失败！";
        echo json_encode($responseData);
        exit;
    };

    // 设置字符集
    mysql_set_charset("utf-8");

    // 选择数据库
    mysql_select_db("xiaomi-user");

    //准备查找重复的mysql语句
    $sql1 = "select * from user_info where username ='$username'";

    // 发送数据
    $res1 = mysql_query($sql1);
    // 取出一条数据用于判断
    $row1 = mysql_fetch_assoc($res1);

    // 判断$row是否存在
    if($row1){
        $responseData["code"] = 5;
        $responseData["message"] = "用户名重复，请重新输入！";
        echo json_encode($responseData);
        exit;
    };

    // 准备sql语句传入数据
    $sql2 = "insert into user_info(username,password,createTime) value('{$username}','{$password}','{$createTime}')";

    $res2 = mysql_query($sql2);

    if(!$res2){
        $responseData["code"] = 6;
        $responseData["message"] = "用户注册失败！";
        echo json_encode($responseData);
        exit;
    }else{
        $responseData["code"] = 0;
        $responseData["message"] = "用户注册成功！";
        echo json_encode($responseData);
        exit;
    };

    // 断开数据库链接
    mysql_close($link);
?>