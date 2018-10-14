
$(document).ready(function () {

    $("#btnaceptar").click(function () {
        navegar();
    });

    function navegar() {
        $("#panelNavegacion").load("citas.html");   
        $("#panelNavegacion").removeClass("form-signin");
        $('body').removeClass("estiloBodyLogin");
    }
});
