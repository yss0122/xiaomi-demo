define(["jquery"],function($){
    function bannerDownload(){
        $.ajax({
            type:"get",
            url:"../data/nav.json",
            success:function(data){
                var bannerArray = data.banner;
                for(var i = 0; i < bannerArray.length; i++){
                    $(`<li>
                        <img alt="#" src="${bannerArray[i].img}">
                    </li>`).appendTo($(".home-banner-list"));
                    var node = $('<li></li>');
                    node.appendTo(".banner-point");
                    if(i == 4){
                        node.addClass("active")
                    }

                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
    // 轮播图
    function banner(){
        var iNow = 0;
        var img = null;
        var btn = null;
        var timer = null;

        timer = setInterval(function(){
            tab();
            iNow++;
        },2000);

        function tab(){
            if(!img){
                img = $(".home-banner-list").find("li");
            }
            if(!btn){
                btn = $(".banner-point").find("li");
            }

            if(iNow == btn.size()){
                iNow = 0;
            }

            img.hide().css("opacity","0.2").eq(iNow).show().animate({opacity:1},500);

            btn.removeClass("active").eq(iNow).addClass("active");
        }

        // banner图添加移入移出
        $(".home-banner-list, .banner-btn_left, .banner-btn_right,.banner-point").mouseenter(function(){
            clearInterval(timer);
            $(".banner-btn_left, .banner-btn_right").stop(true).animate({opacity:0.5})
        }).mouseleave(function(){
            timer = setInterval(function(){
                tab();
                iNow++;
            },2000);
            $(".banner-btn_left, .banner-btn_right").stop(true).animate({opacity:0})
        });

        // 利用事件委托给按钮添加跳转图片
        $(".banner-point").on("click","li",function(){
            iNow = $(this).index();
            tab();
            iNow++
            console.log(iNow)
        });

        $(".banner-btn_left, .banner-btn_right").click(function(){
            if(this.className == "banner-btn_left"){
                iNow--;
                if(iNow==-1){
                    iNow=4;
                }

                console.log(iNow)
            }else{

                iNow++
                console.log(iNow)
            }
            tab();
        })
    }

    // 加载左边导航栏的数据
    function leftNavDownload(){
        $.ajax({
            type:"get",
            url:"../data/nav.json",
            success:function(data){
                leftNavArr = data.sideNav;
                for(var i = 0; i < leftNavArr.length; i++){
                    var node = $(`<li>
                    <a href="list.html">
                        <div class="good-text">
                            ${leftNavArr[i].title}
                            <span class="iconfont icon-jiantouyou"></span>
                        </div>
                    </a>
                    <div class="goods-list">
                    </div>
                </li>`);
                    node.appendTo(".goods-kinds");
                    // 获取图片数据
                    var childArr = leftNavArr[i].child;
                    var col = Math.ceil(childArr.length / 6);
                    node.find(".goods-list").css("width",`${247 * col}px`).addClass(`col-${col}`)

                    for(var j = 0; j < childArr.length; j++){
                        if(j % 6 == 0){
                            var newUl = $(`<ul class="good-list-col" id="${j / 6}">
                            </ul>`);
                            newUl.appendTo(node.find(".goods-list"));
                        }
                        var newLi = $(`<li>
                        <img src="${childArr[j].img}" alt="#">
                        <span>${childArr[j].title}</span>
                        </li>`)
                        newLi.appendTo(newUl);
                    }
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
    function leftNavTab(){
        $(".goods-kinds").on("mouseenter","li",function(){
            $(this).find(".good-text").css("background-color","#ff6700");
            $(this).find(".goods-list").css("display","block");
        }).on("mouseleave","li",function(){
            $(this).find(".good-text").css("background-color","rgba(48, 49, 49,0)");
            $(this).find(".goods-list").css("display","none");
        })
    }
    // 顶部导航栏
    function topNavDownload(){
        $.ajax({
            type:"get",
            url:"../data/nav.json",
            success:function(data){
                topNavArr = data.topNav;
                topNavArr.push({title:"服务"},{title:"社区"})
                for(var i = 0; i < topNavArr.length; i++){
                    node = $(`<li class="good-nav-child">
                    <span>${topNavArr[i].title}</span>
                </li>`);
                    node.appendTo(".goods-nav");


                    if(topNavArr[i].childs){
                        $(`<div class="goods-items">
                    <ul class="goods-ul container">
                    </ul>
                </div>`).appendTo(node)
                        var childArr = topNavArr[i].childs;
                        for(var j = 0; j < childArr.length; j++){
                            $(`<li>
                            <img src="${childArr[j].img}" alt="#">
                            <p>${childArr[j].a}</p>
                            <i>${childArr[j].i}</i>
                        </li>`).appendTo(node.find(".goods-ul"))
                        }
                    }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    function topNavTab(){
        var num = 0;
        $(".goods-nav").on("mouseenter",".good-nav-child",function(){

            $(this).find("span").css("color","#ff6700");
            var index = $(this).index();
            if(index >= 0 && index <= 6){
                num++;
            }else{
                num = 0;
            }
            if(num == 1){
                $(this).find(".goods-items").stop(true).slideDown().css("display", "block");
            }else{
                $(this).find(".goods-items").css("display", "block");
            }
        }).on("mouseleave",".good-nav-child",function(){
            $(this).find("span").css("color"," #333333");
            $(this).find(".goods-items").css("display", "none");
            t = this;//污染了全局变量
        }).mouseleave(function(){
            num = 0;
            $(t).find(".goods-items").css({display: "block"}).stop(true).slideUp();
        })
    }
    function searchTab(){
        $(".search-input").focus(function(){
            $(this).css("border","1px solid #ff6700")
            $(".goods-search p").css("border","1px solid #ff6700")
            $(".search-select").css("border","1px solid #ff6700")

        }).keyup(function(){
            if(!this.value){
                $(".search-select").css("display","none");
            }else{
                $.ajax({
                    type:"get",
                    url:`https://www.baidu.com/su?wd=${this.value}&cb=?`,
                    dataType:"jsonp",
                    success:function(data){
                        var arr = data.s;
                        $(".search-select").html("")
                        for(var i = 0; i < arr.length; i++){
                            $(`<li>
                            <a href="https://www.baidu.com/s?wd=${arr[i]}">${arr[i]}</a>
                            </li>`).appendTo(".search-select");
                            $(".search-select").css("display","block");
                        }
                    },
                    error:function(msg){
                        console.log(msg)
                    }
                })
            }
        }).blur(function(){
            console.log(el);
            if(el == 2){
                $(".search-select").css("display","block");
                el = null;
            }else{
                $(".search-select").css("display","none");
            }

            $(this).css("border","1px solid #e0e0e0")
            $(".goods-search p").css("border","1px solid #e0e0e0")
            $(".search-select").css("border","none")
        });
        var el = null;
        $("body").on("mouseover","div",function(ev){
            // console.log(ev.target.className)
            if(ev.target.className == "search-select"){
                el = 2;
            }
        })
    }
    function btnTab() {
        $(".more-goods").mouseenter(function(){
            $(".goods-box").css("display","block")
        }).mouseleave(function(){
            $(".goods-box").css("display","none")
        })
    }
    return {
        bannerDownload:bannerDownload,
        banner:banner,
        leftNavDownload:leftNavDownload,
        leftNavTab:leftNavTab,
        topNavDownload:topNavDownload,
        topNavTab:topNavTab,
        searchTab:searchTab,
        btnTab:btnTab
    }

})