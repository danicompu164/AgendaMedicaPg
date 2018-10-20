
$(document).ready(function () {
    $(function () {
        $("#nombreMedico").html(usuarioEnvio.nombre);
        cargarAgenda();
    });


    function cargarAgenda() {
        var urlServicio = obtenerServicioWebPorCatalogo(listaServicioWeb, LISTAR_CITAS_POR_MEDICO);
        citasEnvio.idSucursal = sucursal.id;
        //citasEnvio.fecha = formatearDate(new Date());
        citasEnvio.fecha = "2018-10-18";
        citasEnvio.tokenAutorizacion = tokenAutorizacion;
        citasEnvio.idUsuarioMedico = tokenAutorizacion.idUsuario;
        console.log(urlServicio);
        console.log(citasEnvio);

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
            async: false,
            success: function (data) {
                codigoRespuesta = data.respuesta.codigo;
                mensaje = data.respuesta.mensaje;
                if (codigoRespuesta == codigoOk) {
                    console.log(data.listaAgendaPaciente);
                    cargarCitas(data.listaAgendaPaciente);
                } else {
                    alert(mensaje);
                }

            }
        });

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

    function formatearDate(date) {

        var day = date.getDate();
        var monthIndex = date.getMonth() + 1;
        var year = date.getFullYear();

        return year + '-' + monthIndex + '-' + day;
    }

    function cargarCitas(listaAgendaPaciente) {
        $.each(listaAgendaPaciente, function (i, value) {
            agendaPaciente = value;
            console.log(agendaPaciente);
            var htmlCita = "<div class='card'>";
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
            htmlCita = htmlCita + "<div>";
            htmlCita = htmlCita + "Número de identificación: " + agendaPaciente.numeroDocumento;
            htmlCita = htmlCita + "</div>";
            htmlCita = htmlCita + "<div>";
            htmlCita = htmlCita + "Turno: " + agendaPaciente.idTurno;
            htmlCita = htmlCita + "</div>";
            htmlCita = htmlCita + "<div>";
            htmlCita = htmlCita + "Hora: " + agendaPaciente.hora;
            htmlCita = htmlCita + "</div>";
            htmlCita = htmlCita + "<div>";
            htmlCita = htmlCita + "Teléfono: " + agendaPaciente.telefono;
            htmlCita = htmlCita + "</div>";
            htmlCita = htmlCita + "</div>";
            htmlCita = htmlCita + "</div>";

            $("#citasAcordion").append(htmlCita);

        });

    }



});