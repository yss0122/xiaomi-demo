require.config({
    paths:{
        "jquery":"jquery.min",
        "nav": "nav",
        "goodDesc":"goodDesc"
    },
    shim:{
        // 依赖关系
        "jquery.cookie":["jquery"]
    }
})

require(["nav","goodDesc"],function(nav, goodDesc){
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.topNavDownload();
    nav.topNavTab();
    nav.searchTab();
    nav.btnTab();

    goodDesc.download();
    goodDesc.banner();
})