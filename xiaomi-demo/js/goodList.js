define(["jquery"],function($){
    function download(){
        $.ajax({
            type:"get",
            url:"../data/goodsList2.json",
            success:function(arr) {
                for(var i = 0; i < arr.length; i++){
                    $(`<li class=${i == 0 ? "big-star-produce-list" : ""}>
                    <a href="goodsDesc.html?product_id=${arr[i].product_id}" target="_blank">
                        <img src="${arr[i].image}">
                        <h3>${arr[i].name}</h3>
                        <i>${arr[i].desc}</i>
                        <p>
                            <strong>${arr[i].price}</strong>
                            元
                            <em>起</em>
                            <del>${arr[i].del}</del>
                        </p>
                        <b>立即购买</b>
                    </a>
                </li>`).appendTo(".star-produce-list")
                }
            },
            error:function(msg) {
                console.log(msg)
            }
        })
    }

    function banner(){
        var ul = $(".banner-list");
        var iNow = 0;
        var timer = null;

        timer = setInterval(function(){

            iNow++;
            tab();

            console.log(iNow)
        }, 4000);

        function tab() {
            ul.animate({
                left:`${-2560 * iNow}px`
            },1000,function(){
                if(iNow == 2){
                    iNow = 0;
                    ul.css({
                        left:0
                    })
                }
            })
        }

        $(".banner-list").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
                console.log(iNow)
            }, 4000);
        })

    }

    return{
        download:download,
        banner:banner
    }
})