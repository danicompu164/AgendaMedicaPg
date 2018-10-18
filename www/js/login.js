const URL_LOGIN="http://vmi195100.contaboserver.net:8095/vlipcode-salud-ws-adm/webresources/login/obtenerPorCredencialesMovil";
const codigoOk="1";
const codigoErrorLogin="5";
$(document).ready(function () {

    $("#btnaceptar").click(function () {
            var usuario=$("#txtusuario").val();
            var password=$("#txtpassword").val();
            var passwordEncriptado=sha1(password);
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
            async: false,
            success: function (data) {               
                codigoRespuesta=data.respuesta.codigo;
                mensaje=data.respuesta.mensaje;
                if(codigoRespuesta==codigoOk){
                    navegar();
                }else{                    
                    alert(mensaje);
                }
                
            }
        });
        
    });

    function navegar() {
        $("#panelNavegacion").load("citas.html");

    }


});
