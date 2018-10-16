$(document).ready(function () {
    
    $("#btnverdetalles").click(function () {        
        $("#panelNavegacion").load("detalles.html");
    });

    $("#btnMostrarMenu").click(function(){           
        $(".modal-menu").show("slow");
    });

    $("#closeModalMenu").click(function(){
        $(".modal-menu").hide("slow");
    })

});