define(["jquery"],function($){
    function download(){
        $.ajax({
            type:"get",
            url:"../data/slide.json",
            success:function(data){
                var arr = data.data.list.list;
                $(".good-list ul").css("width",`${(arr.length + 1) * 248}px`)
                for(var i = 0; i < arr.length; i++){
                    $(`<li>
                    <img src="${arr[i].img}" alt="">
                    <span>${arr[i].goods_name}</span>
                    <i>${arr[i].desc}</i>
                    <b>${arr[i].goods_price}元  <s>${arr[i].seckill_Price}元</s></b>
                </li>`).appendTo(".good-list ul")
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
    function slideTab(){
        var btn = $(".banner-btns").find("span");
        var iNow = 0;
        tab()
        var count = Math.ceil(24 / 4);

        var timer = setInterval(function(){
            iNow++;

            if(iNow >= count){
                clearInterval(timer)
            }
            tab();
        }, 1000);

        function tab(){

            iNow == 0 ? btn.eq(0).css("color","#e0e0e0") : btn.eq(0).css("color","#b0b2ba");
            iNow == count ? btn.eq(1).css("color","#e0e0e0") : btn.eq(1).css("color","#b0b2ba");

            var iTarget = iNow == count ? iNow * -992 + 496 : iNow * -992;
            $(".good-list ul").css({
                transform:`translate3d(${iTarget}px,0,0)`,
                transitionDuration:"1000ms"
            })
        }

        btn.click(function(){
            $(this).css("color","#fa6509");
            if($(this).index() == 0){
                iNow--;
                iNow = Math.max(0, iNow);
                tab();
            }else{
                iNow++;
                iNow = Math.min(count, iNow);
                tab();
            };
        }).mouseenter(function(){
            $(this).css("color","#fa6509");
        }).mouseleave(function(){
            $(this).css("color","#b0b2ba");
        })

        $(".banner-btns, .good-list").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                if(iNow >= count){
                    clearInterval(timer)
                }else{
                    iNow++;
                    tab();
                }
            }, 1000);
        })
    }
    return{
        download:download,
        slideTab:slideTab,
    }
})