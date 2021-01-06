require.config({
    paths: {
        "jquery": "jquery.min",
        "jquery-cookie":"jquery.cookie",
        "goodsCar":"goodsCar"
    },
    shim:{
        "jquery-cookie":["jquery"]
    }
})

require(["goodsCar"],function(goodsCar){
    goodsCar.carDownload();
    goodsCar.listDownload();
    goodsCar.joinCar();
    goodsCar.checkClick();
    goodsCar.addBtn();
})