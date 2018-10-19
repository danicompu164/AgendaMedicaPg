$(document).ready(function () {
    $(function () {
        $("#nombreMedico").html(usuarioEnvio.nombre);

    });


    $("#btnverdetalles").click(function () {
        $("#panelNavegacion").load("detalles.html");

    });





});