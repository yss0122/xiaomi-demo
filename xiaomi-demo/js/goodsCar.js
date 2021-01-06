define(["jquery","jquery-cookie"],function($){
    function carDownload(){
        new Promise(function(resolve,reject){
            $.ajax({
                url:"../data/goodsCarList.json",
                success:function(data){
                    resolve(data.data)
                },
                error:function(msg){
                    reject(msg);
                }
            })
        }).then(function(arr1){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:"../data/goodsList2.json",
                    success:function(arr){
                        var newArr = arr.concat(arr1);
                        resolve(newArr);
                    },
                    error:function(msg){
                        reject(msg);
                    }
                })
            })
        }).then(function(arr){
            $(".goodslist-body").html("");
            var cookieStr = $.cookie("goods");
            var newArr = [];
            if(cookieStr){
                var cookieArr = JSON.parse(cookieStr);
                for(var i = 0; i < arr.length; i++){
                    for(var j = 0; j < cookieArr.length; j++){
                        if(arr[i].product_id == cookieArr[j].id || arr[i].productid == cookieArr[j].id){
                            arr[i].num = cookieArr[j].num;
                            arr[i].id = cookieArr[j].id;
                            newArr.push(arr[i]);

                        }
                    }
                }
                console.log(newArr);
                for(var k = 0; k < newArr.length; k++){
                    var node = $(`<li id="${newArr[k].id}">
                                <p>
                                    <i>✔</i>
                                </p>
                                <img alt="" src="${newArr[k].image}";h=80" width="80" height="80">
                                <em>${newArr[k].name} </em>
                                <b>${newArr[k].price}元</b>
                                <div class="num-btn">
                                    <a href="#">-</a>
                                    <input type="text" autocomplete="off" value="${newArr[k].num}">
                                    <a href="#">+</a>
                                </div>
                                <strong>${newArr[k].price * newArr[k].num}元</strong>
                                <h6>×</h6>
                            </li>`);
                    node.appendTo(".goodslist-body");
                }
            }
        })
    }

    function listDownload(){
        $.ajax({
            type:"get",
            url:"../data/goodsCarList.json",
            success:function(data){
                var arr = data.data;
                for(var i = 0; i < arr.length; i++){
                    var node = $(`<li>
                    <img alt="多彩指尖积木" src="${arr[i].image}?thumb=1&amp;w=180&amp;h=180&amp;f=webp&amp;q=90">
                    <h3>${arr[i].name}</h3>
                    <p>${arr[i].price}元</p>
                    <i>${arr[i].comments}人好评</i>
                    <div class="join-car" id="${arr[i].productid}">
                        加入购物车
                    </div>
                </li>`)
                    node.appendTo(".cart-list");
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }

    function joinCar(){
        $(".cart-list").on("click",".join-car", function(){

            var id = this.id;
            var first = $.cookie("goods");
            if(!first){
                var arr = [{id: id, num: 1}]
                $.cookie("goods",JSON.stringify(arr),{
                    expires:7
                });
            }else{
                var yes = false;
                var cookieStr = $.cookie("goods");
                var cookieArr =JSON.parse(cookieStr);
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        cookieArr[i].num++;
                        yes = true;
                    }
                };
                if(!yes){
                    var obj = {id: id, num:1};
                    cookieArr.push(obj);
                };

                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                });

            }
            carDownload();
            isCheckAll();
        })
    }

    function checkClick(){
        $(".goodsCar-title p").find("i").click(function(){
            var allCheck = $(".goodslist-body").find("li p").find("i");

            if($(this).hasClass("check-text")){
                $(this).add(allCheck).removeClass("check-text");
            }else{
                $(this).add(allCheck).addClass("check-text");
            }
            isCheckAll();
        });

        $(".goodslist-body").on("click","li p i",function(){
            if($(this).hasClass("check-text")){
                $(this).removeClass("check-text");
            }else{
                $(this).addClass("check-text");
            }
            isCheckAll();
        })

    }


    function isCheckAll(){
        var allCheck = $(".goodslist-body").find("li");
        var count = 0;//选择数量
        var total = 0;//总数
        var countTotal = 0;//总钱
        var isYes = true;//假如全选

        allCheck.each(function(index, item){
            if(!$(item).find("p i").hasClass("check-text")){
                isYes = false;
            }else{
                total += parseFloat($(item).find(".num-btn input").val()) * parseFloat($(item).find("b").html().trim());
                count += parseInt($(item).find(".num-btn input").val())
            };
            countTotal += parseInt($(item).find(".num-btn input").val())
        })

        $(".left-section").find("p span").html(countTotal);
        $(".left-section").find("p i").html(count);
        $(".right-total").find("p span").html(total);

        if(isYes){
            $(".goodsCar-title p").find("i").addClass("check-text");
        }else{
            $(".goodsCar-title p").find("i").removeClass("check-text");
        }

    }

    function addBtn(){
        $(".goodslist-body").on("click","li .num-btn a",function(){
            var id = $(this).closest("li").attr("id");
            var cookieStr = $.cookie("goods");
            var price = parseFloat($(this).closest("li").find("b").html().trim());

            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    if(this.innerHTML == "+"){
                        cookieArr[i].num++;
                    }else{
                        if(cookieArr[i].num == 1){
                            alert("商品只剩一件，不能再减少")
                        }else{
                            cookieArr[i].num--;
                        }
                    }

                    $(this).parent().find("input").val(cookieArr[i].num);


                    $(this).closest("li").find("strong").html(price * cookieArr[i].num + "元");

                }
            }
            $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
            });
            isCheckAll();
            return false;
        })

        $(".goodslist-body").on("click","li h6",function(){
            var res = confirm("确定要删除此商品吗?");
            if(res){
                $(this).closest("li").remove();
                var id = $(this).closest("li").attr("id");
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        newArr = cookieArr.splice(i, i+1);
                    }
                }

            }
            $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
            });
            isCheckAll();
        })
    }



    return{
        carDownload:carDownload,
        listDownload:listDownload,
        joinCar:joinCar,
        checkClick:checkClick,
        addBtn:addBtn
    }
})