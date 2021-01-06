require.config({
    paths:{
        "jquery":"jquery.min",
        "register":"register",
        "ajax":"ajax"
    }
})

require(["register"],function(register){
    register.registerSend();
})