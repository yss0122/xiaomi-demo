define(function(){
    /*
        success:成功下载数据之后执行的代码
        error:下载数据之后执行的代码
        */
    function $ajax({method, url, data, success, error}){
        var xhr = null;
        try{
        xhr = new XMLHttpRequest();//本来要执行的代码
        // throw new Error("这是演习不要紧张")  手动抛出异常
        }catch(Error){
            xhr = new ActiveXObject("Microsoft.XMLHTTP")//替补代码
            // alert(Error);//输出错误原因
        }
        // 判断data是否存在，如果存在则给他从对象转变为字符串
        if(data){
            data = querystring(data);
        }

        // 判断提交数据的方法来更改url
        if(method=="get" && data){
            url += '?' + data;
        }
        // 调用open
        xhr.open(method,url, true);


        //调用send,发送请求给服务器
        // 判断提交数据的方式来规定使用的方法
        if(method == "get"){
            xhr.send();
        }else{
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhr.send(data);
        }

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                // 判断本次下载的状态码
                if(xhr.status == 200){
                    if(success){
                        success(xhr.responseText)
                    }
                }else{
                    if(error){
                        error("error:" + xhr.status)
                    }
                }
            }
        }
    }
    // 封装对象转变为字符串函数
    function querystring(obj){
        var str="";
        for(attr in obj){
            str += attr + "=" + obj[attr] + "&";
        }
        return str.substring(0, str.length - 1);
    }

    return{
        $ajax:$ajax,
    }
})
