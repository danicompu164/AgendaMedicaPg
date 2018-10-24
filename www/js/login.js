
$(document).ready(function () {

    $("#btnaceptar").click(function () {    
        $("#spinner").show();
        var usuario = $("#txtusuario").val();
        var password = $("#txtpassword").val();
        var passwordEncriptado = sha1(password);
        var codigoRespuesta;
        var mensaje;
        
        $.ajax({
            url: URL_LOGIN,
            type: 'POST',
            data: JSON.stringify({ "login": usuario, "password": passwordEncriptado }),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, text_status, strError) {
                alert('No se pudo conectar ' + strError);
            },
            timeout: 90000,
            async: true,
            success: function (data) {
                
                codigoRespuesta = data.respuesta.codigo;
                mensaje = data.respuesta.mensaje;
                
                if (codigoRespuesta == codigoOk) {
                    usuarioEnvio = data.loginEnvio.usuarioEnvio;
                    tokenAutorizacion = data.loginEnvio.usuarioEnvio.tokenAutorizacion;
                    listaSucursal = data.loginEnvio.listaSucursal;
                    listaServicioWeb = data.loginEnvio.listaServicioWeb;
                  
                    navegar();
                } else {
                    $('#exampleModalCenter').modal('show');
                }

            }
        });

    });

    function navegar() {
        var contador = 0;
        $.each(listaSucursal, function (i, value) {

            sucursal = value;            
            contador++;
        });
        if (contador > 1) {
            
            $("#panelNavegacion").load("sucursales.html");
        } else {
            $("#panelNavegacion").load("citas.html");
        }
        $("#spinner").hide();


    }




});
