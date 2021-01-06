define(["jquery"],function($){
    function download(){
        $.ajax({
            type:"get",
            url:"../data/data.json",
            success:function(arr){
                var firstData = arr[0];
                var node = $(`<div class="goods-wrap phone">
                <div class="top-ad clear">
                    <img alt="test" src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/a59db7dac2804ee2b5c7be1b02b3770e.jpg?thumb=1&amp;w=1226&amp;h=120&amp;f=webp&amp;q=90">
                </div>
                <div class="phone-kind">
                    <h2>${firstData.title}</h2>
                    <div class="more-btns">
                        <a href="#">
                            查看全部
                            <span>
                                <i class="iconfont icon-jiantou-copy-copy"></i>
                            </span>
                        </a>
                    </div>
                    <div class="left-ad">
                        <img alt="#" src="${firstData.img}">
                    </div>
                    <div class="phone-list">
                        <ul>
                        </ul>
                    </div>

                </div>
            </div>`);
                node.appendTo($(".matter .container"));

                var childArr = firstData.childs;
                for(var i = 0; i < childArr.length; i++){
                    $(`<li>
                    <img src="${childArr[i].img}" alt="#">
                    <span>${childArr[i].title}</span>
                    <i>${childArr[i].desc}</i>
                    <b>${childArr[i].price}元  <s>${childArr[i].del}元</s></b>
                </li>`).appendTo(node.find(".phone-list ul"))
                };
                // 后续数据
                for(var i = 1; i < arr.length; i++){
                    var node2 = $(`<div class="goods-wrap">
                    <div class="good-kind-ad">
                        <img alt="test" width="1226" height="120" src="${arr[i].topImg}">
                    </div>
                    <div class="good-kind-rub">
                        <h2>${arr[i].title}</h2>
                        <div class="good-more-btns">
                            <span class="btn-active">热门</span>
                            <span>${arr[i].subTitle}</span>
                        </div>
                        <div class="good-left-ad">
                            <ul>
                                <li>
                                    <img alt="" src="${arr[i].leftChilds[0]}">
                                </li>
                                <li>
                                    <img alt="" src="${arr[i].leftChilds[1]}">
                                </li>
                            </ul>
                        </div>
                        <div class="good-more-list">
                            <ul class="good-hotChild">
                            </ul>
                            <ul class="good-child goods-hide">
                            </ul>
                        </div>
                    </div>
                </div>`);
                    node2.appendTo($(".matter .container"));

                    var hotChild = arr[i].hotChilds;
                    for(var j = 0; j < hotChild.length; j++){
                        $(`<li class="${j == 7 ? "last-childs" : ""}">
                        <img src="${hotChild[j].img}" alt="">
                        <span>${hotChild[j].title}</span>
                        <i>${hotChild[j].desc}</i>
                        <b>${hotChild[j].price}元  <s>${hotChild[j].del}元</s></b>
                    </li>`).appendTo(node2.find(".good-hotChild"));
                    };

                    var child = arr[i].childs;
                    for(var k = 0; k < child.length; k++){
                        $(`<li class="${k == 7 ? "last-childs" : ""}">
                        <img src="${child[k].img}" alt="">
                        <span>${child[k].title}</span>
                        <i>${child[k].desc}</i>
                        <b>${child[k].price}元  <s>${child[k].del}元</s></b>
                    </li>`).appendTo(node2.find(".good-child"));
                    };

                    $(`<li class="last-childs">
                    <p>浏览更多</p>
                    <img width="80" height="80" alt="" src="../images/more-jiantou.png">
                    <em>${arr[i].title}</em>
                </li>`).appendTo(node2.find(".good-more-list ul"))
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
    function goodTab() {
        $(".matter").on("mouseenter",".good-more-btns span", function(){
            $(this).addClass("btn-active").siblings("span").removeClass("btn-active")
            $(this).closest(".good-kind-rub").find(".good-more-list ul").addClass("goods-hide").eq($(this).index()).removeClass("goods-hide");
        })
    }
    return{
        download:download,
        goodTab:goodTab,
    }
})