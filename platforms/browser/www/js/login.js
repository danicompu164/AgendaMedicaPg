
$(document).ready(function () {

    $("#btnaceptar").click(function () {

        $.ajax({
            url: 'http://vmi195100.contaboserver.net:8095/vlipcode-salud-ws-adm/webresources/login/obtenerPorCredencialesMovil',
            type: 'POST',
            data: JSON.stringify({ "login": "1818181818", "password": "4d6db86afa1528fbe5248db396b65119b7c177de" }),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, text_status, strError) {
                alert('No se pudo conectar ' + strError);
            },
            timeout: 90000,
            async: false,
            success: function (data) {

                console.log("datos ==="+data);
                navegar();
            }
        });
        
    });

    function navegar() {
        $("#panelNavegacion").load("citas.html");

    }


});
