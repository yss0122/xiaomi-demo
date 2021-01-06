require.config({
    paths:{
        "jquery":"jquery.min",
        "nav":"nav",
        "goodList":"goodList"
    }
})

require(["nav","goodList"],function(nav,goodList){
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.topNavDownload();
    nav.topNavTab();
    nav.searchTab();
    nav.btnTab();

    goodList.download();
    goodList.banner();

})