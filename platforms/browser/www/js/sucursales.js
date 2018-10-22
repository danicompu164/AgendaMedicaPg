$(document).ready(function () {
    $(function () {
        $("#nombreMedico").html(usuarioEnvio.nombre);
        cargarSucursales();
    });

    function cargarSucursales() {
        var htmlSucursales;
        $.each(listaSucursal, function (i, value) {
            sucursal = value;
            htmlSucursales = htmlSucursales + "<a href='#' class='list-group-item list-group-item-action'>";
            htmlSucursales = htmlSucursales + sucursal.nombre;
            htmlSucursales = htmlSucursales + "</a>";
            console.log(htmlSucursales);
            $("#listaSucursales").append(htmlSucursales);
        });

    }



});