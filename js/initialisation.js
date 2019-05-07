// Initialisation à faire au début de programmme.

let websockets = [];
let tabObjetRFID = [];

let iPrincipaleSensor = [];
let iCuisineSensor = [];

$(document).ready(function () {
    $.getJSON("config.json", function (data) {
        let tmp = "";
        let html= '';
        let svg;
        
        websockets = data["websockets"];
    
        //  2 tableaux de sensors. 
        //  0 --> interface principale du Liara
        //  1 --> interface cuisine 
        //console.log("href: " + document.location.pathname);
        if(document.location.pathname === "/interface_liara_dessus.html") {
            //console.log("liara_dessus");
           
        }
        else if (document.location.pathname === "/interface_cuisine_face.html") {
            //console.log("cuisine_face");
            
        }
        else{
            //console.log("default");
        }
     
        iPrincipaleSensor = data['sensor'][0];    
        iCuisineSensor = data['sensor'][1];   
        for(let i = 0; i<data['RFID'].length; i++) {
    
            svg = document.createElementNS("http://www.w3.org/2000/svg", "text");
            svg.setAttribute('id', data['RFID'][i]['id_laboratory']);
            svg.setAttribute('x', '0');
            svg.setAttribute('y', '0');
            svg.setAttribute('fill', 'red');
            svg.setAttribute('opacity', '0');
            svg.setAttribute('font-family', 'Comic Sans MS');
            svg.setAttribute('font-size', '7');
            svg.textContent = data['RFID'][i]['id_software'];
            $('#plan').append(svg);
    
            if (tmp !== data['RFID'][i]['classAffiche'] ) {
                if (tmp !== "") {
                    html += '</fieldset></div>';
                }
                if (data['RFID'][i]['classAffiche'] === "Petites Assiettes") {
                    html += '<div class="col-md-3"><fieldset><legend>'+ data['RFID'][i]['classAffiche'] + '</legend>';
                } else {
                    html += '<div class="col-md-2"><fieldset><legend>'+ data['RFID'][i]['classAffiche'] + '</legend>';
                }
                tmp = data['RFID'][i]['classAffiche'];
            }
            html += '<div class="checkbox checkbox-success checkbox-inline"><input id="'+data['RFID'][i]['btnSoftwareID']+'" class="checkbox_rfid" type="checkbox" onchange="printObjectRFID(this,'+"'"+data['RFID'][i]['id_laboratory']+"'"+')"><label for="'+data['RFID'][i]['btnSoftwareID']+'">'+data['RFID'][i]['id_software']+'</label></div>';
        }
        html += '</fieldset></div>';
        $('#tableCheckbox').html(html);
    
        WS_init(websockets);
    })
})





