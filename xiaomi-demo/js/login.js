define(["jquery"],function($){
    function loginSend() {
        $(".register").click(function(){
            $.ajax({
                type:"post",
                url:"../php/login.php",
                data:{
                    username:$(".regbox").find("input").eq(0).val(),
                    password:$(".regbox").find("input").eq(1).val()
                },
                success:function(data){
                    var obj = JSON.parse(data);
                    if(obj.code){
                        $(".reminder").html(obj.message).css("display","block");
                    }else{
                        setTimeout(function(){
                            location.href = "goodsCar.html";
                        },500)
                    }
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
    }
    return{
        loginSend:loginSend
    }
})