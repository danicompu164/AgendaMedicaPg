$(document).ready(function () {
    $(function () {
        $("#nombreMedico").html(usuarioEnvio.nombre);
        cargarSucursales();
    });

    function cargarSucursales() {
        var htmlSucursales = "";
        $.each(listaSucursal, function (i, value) {
            sucursal = value;
            htmlSucursales = htmlSucursales + "<a href='#' class='list-group-item list-group-item-action' onclick='cargarCitas("+JSON.stringify(sucursal)+")'>";
            htmlSucursales = htmlSucursales + sucursal.nombre;
            htmlSucursales = htmlSucursales + "</a>";
            console.log(htmlSucursales);
            $("#listaSucursales").append(htmlSucursales);
        });

    }



});

function cargarCitas(sucursalSeleccionada) {
   
    $(function () {         
        sucursal=sucursalSeleccionada;        
        $("#panelNavegacion").load("citas.html");
    });
}
