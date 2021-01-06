require.config({
    paths:{
        "jquery":"jquery.min",
        "nav": "nav",

    },
    shim:{
        // 依赖关系
        "jquery-cookie":["jquery"]
    }
})

require(["nav"],function(nav){
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.topNavDownload();
    nav.topNavTab();
    nav.searchTab();
    nav.btnTab();
})