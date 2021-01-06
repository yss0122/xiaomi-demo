define(["jquery","jquery.cookie"],function($){
    function download(){
        var productId = valueOfStr(location.search,"product_id");
        console.log(productId);
        $.ajax({
            type:"get",
            url:"../data/goodsList.json",
            success:function(data){
                var gDObj = data.find(item => item.product_id == productId);
                console.log(gDObj);
                var node = $(`<h2>${gDObj.name}  ${gDObj.value}</h2>
                <p>
                    <i>${gDObj.product_desc_ext}</i>
                    <em></em>
                </p>
                <h3>小米自营</h3>
                <span>
                    <b>${gDObj.price_max}</b>
                    <del>${gDObj.market_price_max}</del>
                </span>`);
                node.appendTo(".phone-info");

                node2 = $(`
                <div class="phone-box">
                    <ul class="phone-list">
                    </ul>
                    <ol class="phone-point">
                    </ol>
                    <div class="phone-btn">
                        <span class="phone-btn-left">
                            <img src="../images/按钮左.png" alt="">
                        </span>
                        <span class="phone-btn-right">
                            <img src="../images/按钮右.png" alt="">
                        </span>
                    </div>
                </div>`);
                node2.appendTo(".img-left");

                if(gDObj.images.length == 1){
                    $(`<li>
                            <img src="${gDObj.images[0]}">
                        </li>`).appendTo(node2.find(".phone-list"));
                    $(".phone-point,.phone-btn").hide()
                }else{

                    var images = gDObj.images;
                    for(var i = 0; i < images.length;i++){
                        $(`
                        <li class=${i == 0 ? "active" : "hide"}>
                            <img src="${images[i]}">
                        </li>
                            `).appendTo(node2.find(".phone-list"))

                        $(`<li class=${i == 0 ? "phone-point-active" : ""}></li>`).appendTo(node2.find(".phone-point"))
                    }
                }

            },
            error:function(msg){
                console.log(msg)
            }
        })
    }

    // 获取product_id
    // ?name1=value1&?name2=value2
    function valueOfStr(search,name){
        var start = search.indexOf(name + "=", 0);
        if(start == -1){
            return null;
        }else{
            end = search.indexOf("&", start);
            if(end == -1){
                end = search.length
            }

            var str = search.substring(start,end);
            var Arr = str.split("=")
            return Arr[1];
        }
    }

    function banner(){
        var iNow = 0;
        var img = null;
        var point = null;
        var timer = null;

        $(".img-left").on("click", ".phone-point li",function(){
            iNow = $(this).index();
            tab();
        })

        timer = setInterval(function(){
            iNow++;
            tab();
        },2000);

        $(".img-left").on("mouseenter", ".phone-box",function(){
            clearInterval(timer);
        }).on("mouseleave",".phone-box",function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2000);
        });

        $(".img-left").on("click",".phone-btn span",function(){
            if(this.className == "phone-btn-left"){
                iNow--;
                if(iNow == -1){
                    iNow = 4;
                }
            }else{
                iNow++;
            }
            tab();
        })

        function tab(){
            if(!img){
                img = $(".phone-list").find("li");
            }
            if(!point){
                point = $(".phone-point").find("li");
            }
            if(img.size() == 1){
                clearInterval(timer);
            }else{
                if(iNow == point.size()){
                    iNow = 0;
                }
                img.hide().eq(iNow).show();
                point.removeClass("phone-point-active").eq(iNow).addClass("phone-point-active");
            }
        }



        $(".sale-btn").click(function(){
            var id = valueOfStr(location.search,"product_id");
            var first = $.cookie("goods") ? true : false;
            if(!first){
                var Arr = [{id: id,num: 1}];
                $.cookie("goods",JSON.stringify(Arr),{
                    expires:7
                })
            }else{
                var yes = false;
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        cookieArr[i].num++;
                        yes = true;
                    }
                }
                if(!yes){
                    var obj = {id: id, num:1};
                    cookieArr.push(obj);
                }
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                });
            }
            alert($.cookie("goods"));
        })
    }

    return {
        download:download,
        banner:banner
    }
})