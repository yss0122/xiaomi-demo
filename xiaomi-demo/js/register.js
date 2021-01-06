define(["jquery"],function($){
    function registerSend(){
        $(".register").click(function(){
            $.ajax({
                type:"post",
                url:"../php/register.php",
                data:{
                    username:$(".regbox").find("input").eq(0).val(),
                    password:$(".regbox").find("input").eq(1).val(),
                    repassword:$(".regbox").find("input").eq(2).val(),
                    createTime:(new Date()).getTime(),
                },
                success:function(data){
                    var obj = JSON.parse(data);
                    if(obj.code){
                        $(".reminder").html(obj.message).css("display","block");
                    }else{
                        $(".reminder").html(obj.message).css({
                            display:"block",
                            color:"green"
                        });
                        setTimeout(function(){
                            location.href = "login.html";
                        },2000)
                    }
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
    }
    return{
        registerSend:registerSend,
    }
})