require.config({
    paths:{
        "jquery":"jquery.min",
        "jquery-cookie":"jquery.cookie",
        "nav":"nav",
        "slide":"slide",
        "data":"data"
    }
})


require(["nav","slide","data"],function(nav,slide,data){
    nav.bannerDownload();
    nav.banner();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.topNavDownload();
    nav.topNavTab();
    nav.searchTab();

    slide.download();
    slide.slideTab();

    data.download();
    data.goodTab();
})