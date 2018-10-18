$(document).ready(function () {
    $(function () {
        $("#nombreMedico").html(usuarioEnvio.nombre + ' ' + usuarioEnvio.apellido);

    });


    $("#btnverdetalles").click(function () {
        $("#panelNavegacion").load("detalles.html");

    });





});