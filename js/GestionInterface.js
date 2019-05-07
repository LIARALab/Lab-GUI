/**
 * 
 *      Function pour mettre le SVG en plein ecran
 * 
 */

function pleinEcran(_element) {
    
    let monElement = document.getElementById(_element)||document.documentElement;
    if (document.webkitFullscreenEnabled) {
        if (!document.webkitFullscreenElement) {
            monElement.webkitRequestFullscreen();
        } else {
            document.webkitExitFullscreen();
        }
    }
}

function switchPage(page, time_milli){    // 60 sec
    setTimeout(function(){document.location.href = "./" + page + ".html";}, time_milli);
}

/**
 * 
 *      Function pour changer de page avec un click
 *      Sur la forme geometrique ou l'element desire ajouter,
 *      onclick='openPage("nom_de_la_page_html")'
 * 
 */

function openPage(page)
{
    document.location.href = "./" + page + ".html";
}

function test() {
    
}
/**
 * 
 *      Charger les textures dans une 
 *      <div id="container-texture"> 
 *      avec le ficher texture.html
 * 
 */
$(function(){
    $('#container-texture').load('texture.html'); 
});

/**
 * 
 *      Charger l'interface de temperature dans une 
 *      <div id="container-temperature"> 
 *      avec le ficher interface_temperature.html
 * 
 */
$(function () {
    $('#container-temperature').load('interface_temperature.html');
});

/**
 * 
 *      Charger l'interface de temperature dans une 
 *      <div id="container-rfid"> 
 *      avec le ficher interface_rfid.html
 * 
 */
$(function () {
    $('#container-fluid').load('interface_rfid.html');
});



$("#bouton_web_portes").bind("click", function () {
    changerWebsocketPortes();
});

$("#bouton_web_objets").bind("click", function () {
    changerWebsocketObjets();
});

$("#run").bind("click", function () {
    alertify.confirm("Confirmation","Confimez vous avoir rentré des adresses de websocket valides et que la disposition des portes dans LIARA est identique à la maquette ci-dessus, si ce n'est pas le cas veuillez cliquer sur cancel", function () {
        websocketPortesTurnOn();
        websocketObjetsTurnOn();
        $("#stop").css("visibility","visible");
        $("#run").css("visibility","hidden");
        $("#boutons_websockets").css("visibility","hidden");
    }, function() {
        // user clicked "cancel"
    });
});

$("#stop").bind("click", function () {
    websocketPortesTurnOff();
    websocketObjetsTurnOff();
    $("#stop").css("visibility","hidden");
    $("#run").css("visibility","visible");
    $("#boutons_websockets").css("visibility","visible");
});

$("#select_all").change(function(){  //"select all" change
    $(".checkbox_rfid").prop('checked', $(this).prop("checked")).change(); //change all ".checkbox" checked status
});