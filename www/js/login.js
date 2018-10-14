
$(document).ready(function () {

    $("#btnaceptar").click(function () {
        navegar();
    });

    function navegar() {
        $("#panelNavegacion").load("citas.html");   
                
    }
});
