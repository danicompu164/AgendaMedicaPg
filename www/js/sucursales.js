$(document).ready(function () {
    $(function () {
        $("#nombreMedico").html("Hola "+usuarioEnvio.nombre);
       
        cargarSucursales();
    });

    function cargarSucursales() {
        var htmlSucursales = "";
        $.each(listaSucursal, function (i, value) {
            sucursal = value;
            htmlSucursales = htmlSucursales + "<a href='#' class='list-group-item list-group-item-action' onclick='cargarCitas("+JSON.stringify(sucursal)+")'>";
            htmlSucursales = htmlSucursales + sucursal.nombre;
            htmlSucursales = htmlSucursales + "</a>";          
            
        });
        $("#listaSucursales").html(htmlSucursales);

    }

   



});

function cargarCitas(sucursalSeleccionada) {
    $("#spinner").show();
    $(function () {         
        sucursal=sucursalSeleccionada;        
        $("#panelNavegacion").load("citas.html");
        $("#spinner").hide();
    });
}

function salir() {
    $(function () {
        tokenAutorizacion = null;
        $('#modalMenu').modal('hide');
        $("#panelNavegacion").load("login.html");
    });
}
