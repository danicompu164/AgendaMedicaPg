var fechaSeleccionada;
var fechasDisponibles = new Array();

$(document).ready(function () {
    $(function () {
        $("#nombreMedico").html("Hola "+usuarioEnvio.nombre);
        cargarMenu();

        cargarFechas();
    });






    function formatearDate(date) {

        var day = date.getDate();
        var monthIndex = date.getMonth() + 1;
        var year = date.getFullYear();

        return year + '-' + monthIndex + '-' + day;
    }



    function cargarMenu() {
        var htmlMenu = "";
        if (listaSucursal.length > 1) {
            htmlMenu = htmlMenu + "<li class='nav-item'>";
            htmlMenu = htmlMenu + "<a class='nav-link active' href='#' onclick='navegarSucursales()'>";
            htmlMenu = htmlMenu + "<span class='fa fa-hospital-o' aria-hidden='true'></span>";
            htmlMenu = htmlMenu + " Sucursales";
            htmlMenu = htmlMenu + "</a>";
            htmlMenu = htmlMenu + "</li>";
        }

        htmlMenu = htmlMenu + "<li class='nav-item'>";
        htmlMenu = htmlMenu + "<a class='nav-link active' href='#' id='linkSalir' onclick='salir()'>";
        htmlMenu = htmlMenu + "<span class='fa fa-sign-out' aria-hidden='true'></span>";
        htmlMenu = htmlMenu + " Salir";
        htmlMenu = htmlMenu + "</a>";
        htmlMenu = htmlMenu + "</li>";
        $("#itemsMenu").append(htmlMenu);

    }

    $("#btnConfirmaEliminar").click(function () {
        $("#spinner").show();

        var urlServicio = obtenerServicioWebPorCatalogo(listaServicioWeb, CANCELAR_CITAS_POR_MEDICO);

        $.ajax({
            url: urlServicio,
            type: 'POST',
            data: JSON.stringify(cancelarCitaEnvio),
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
                    cargarAgenda();
                } else {
                    alert(mensaje);
                }

            }
        });


    });

    function cargarFechas() {
        var items = "";
        for (i = 0; i < 5; i++) {
            var newdate = new Date();
            newdate.setDate(newdate.getDate() + i);
            var fecha = formatearDate(newdate);
            items = items + "<a class='dropdown-item' href='#' onclick='seleccionarFecha(\"" + fecha + "\")'>" + fecha + "</a>";
        }
        $("#cmbFechasItems").html(items);

    }

});

function salir() {
    $(function () {
        tokenAutorizacion = null;
        $('#modalMenu').modal('hide');
        $("#panelNavegacion").load("login.html");
    });
}

function navegarSucursales() {
    $(function () {
        $('#modalMenu').modal('hide');
        $("#panelNavegacion").load("sucursales.html");
    });
}

function cancelarCita(citaMedica) {
    console.log(citaMedica);
    $("#modalCancelarCita").modal('show');
    cancelarCitaEnvio.id = citaMedica.id;
    cancelarCitaEnvio.idTurno = citaMedica.idTurno;
    cancelarCitaEnvio.tokenAutorizacion = tokenAutorizacion;
}

function obtenerServicioWebPorCatalogo(listaServicioWeb, codigoCatalogo) {
    var url;

    $.each(listaServicioWeb, function (i, value) {

        if (value.codigo == codigoCatalogo) {
            return url = value.url;
        }
    });

    return url;
}

function cargarCitas(listaAgendaPaciente) {
    var htmlCita = "";
   
    $.each(listaAgendaPaciente, function (i, value) {
        agendaPaciente = value;
       

        htmlCita = htmlCita + "<div class='card-header' id='heading" + i + "'>";
        htmlCita = htmlCita + "<h5 class='mb-0'>";
        htmlCita = htmlCita + "<button class='btn btn-link collapsed' type='button' data-toggle='collapse' data-target='#collapse" + i + "' aria-expanded='false' aria-controls='collapse" + i + "'>";
        htmlCita = htmlCita + agendaPaciente.paciente;
        htmlCita = htmlCita + "</h5>";
        htmlCita = htmlCita + "</button>";
        htmlCita = htmlCita + "</div>";
        htmlCita = htmlCita + "</div>";
        htmlCita = htmlCita + "<div id='collapse" + i + "' class='collapse' aria-labelledby='heading" + i + "' data-parent='#citasAcordion'>";
        htmlCita = htmlCita + "<div class='card-body'>";
        htmlCita = htmlCita + "<div class='espacio-izquierdo-contenido-citas'>";
        htmlCita = htmlCita + "Número de identificación: " + agendaPaciente.numeroDocumento;
        htmlCita = htmlCita + "</div>";
        htmlCita = htmlCita + "<div class='espacio-izquierdo-contenido-citas'>";
        htmlCita = htmlCita + "Turno: " + agendaPaciente.idTurno;
        htmlCita = htmlCita + "</div>";
        htmlCita = htmlCita + "<div class='espacio-izquierdo-contenido-citas'>";
        htmlCita = htmlCita + "Hora: " + agendaPaciente.hora;
        htmlCita = htmlCita + "</div>";
        htmlCita = htmlCita + "<div class='espacio-izquierdo-contenido-citas'>";
        htmlCita = htmlCita + "Teléfono: " + agendaPaciente.telefono;
        htmlCita = htmlCita + "</div>";

        htmlCita = htmlCita + "<div class='container'>";
        htmlCita = htmlCita + " <div class='row'>";
        htmlCita = htmlCita + "<div class='col' style='text-align:right'>";
        htmlCita = htmlCita + " <a href='tel:" + agendaPaciente.telefono + "'  >";
        htmlCita = htmlCita + "<i class='fa fa-phone fa-lg' aria-hidden='true'></i>";
        htmlCita = htmlCita + "</a>";
        htmlCita = htmlCita + "</div>";
        htmlCita = htmlCita + "<div class='col' style='text-align:left'>";
        htmlCita = htmlCita + " <a href='#' onclick='cancelarCita(" + JSON.stringify(agendaPaciente) + ")'>";
        htmlCita = htmlCita + "<i class='fa fa-trash-o fa-lg' aria-hidden='true'></i>";
        htmlCita = htmlCita + "</a>";
        htmlCita = htmlCita + "</div>";
        htmlCita = htmlCita + "</div>";
        htmlCita = htmlCita + "</div>";

        htmlCita = htmlCita + "</div>";
        htmlCita = htmlCita + "</div>";

    });
    $("#citasAcordion").html(htmlCita);
    $("#spinner").hide();

}

function seleccionarFecha(fecha) {
    $("#cmbFechas").html(fecha);
    $("#spinner").show();
    var urlServicio = obtenerServicioWebPorCatalogo(listaServicioWeb, LISTAR_CITAS_POR_MEDICO);

    citasEnvio.idSucursal = sucursal.id;
    citasEnvio.fecha = fecha;
    //citasEnvio.fecha = "2018-10-21";
    citasEnvio.tokenAutorizacion = tokenAutorizacion;
    citasEnvio.idUsuarioMedico = tokenAutorizacion.idUsuario;
   
    $.ajax({
        url: urlServicio,
        type: 'POST',
        data: JSON.stringify(citasEnvio),
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
                var lista=data.listaAgendaPaciente;
                if(lista.length>0){
                    cargarCitas(lista);
                }else{
                    $("#spinner").hide();
                    $("#modalSinCitas").modal('show');
                }
                
            } else {
                alert(mensaje);
            }

        }
    });



}

