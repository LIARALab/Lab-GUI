function RFID(event) {
    let d = JSON.parse(event.data);
    for (let i = 0; i < d['lst_RFIDPosition'].length; i++) {
        
        if (tabObjetRFID.indexOf(d['lst_RFIDPosition'][i]['TagName']) > -1) {
            document.getElementById(d['lst_RFIDPosition'][i]['TagName']).style.opacity = '1';
            anime({
                targets: '#' + d['lst_RFIDPosition'][i]['TagName'],
                easing: 'linear',
                translateX: ((d['lst_RFIDPosition'][i]['Coord']['X']) * 559) / 1150,
                translateY: 267 - (((d['lst_RFIDPosition'][i]['Coord']['Y']) * 267) / 400)
            });
        }
    }
}

function Objets(event) {

    let d = JSON.parse(event.data);

    //console.log(d);

    for (let i = 0; i < d.length; i++) {

        let item_websocket = d[i];

        switch(document.location.pathname) {
            case "/interface_liara_dessus.html":
                loadInterfacePrincipale(item_websocket);
                break;
            case "/interface_cuisine_face.html":
                loadInterfaceCuisine(item_websocket)
                break;
            default:
                console.log("default");
                break;
        }

    }
}

function loadInterfacePrincipale(item_websocket) {
    for (let j = 0; j < iPrincipaleSensor['interface_salle_dessus'].length; j++) {

        let item_sensor = iPrincipaleSensor['interface_salle_dessus'][j];
        

        //  Gestion de la pression du lit
        if (item_websocket['SensorName'] === "Pression Lit") {
        
            if (item_websocket['AnalogValue'] >= 10) {
                edredonO.restart();
            } else {
                edredonF.restart();
            }
            continue;
        }

        //  Gestion de la température des pièces
        if (item_websocket['SensorName'].indexOf("Temperature") !== -1 && item_sensor["id_laboratory"] === item_websocket['SensorName']) {
            let temp = item_websocket['AnalogValue'].toFixed(1);
            let TabTemp = temp.toString().split(".");
            $(item_sensor["id"] + " .entier").html(TabTemp[0]);
            $(item_sensor["id"] + " .decimal").html(TabTemp[1]);
            continue;
        }

        //  Gestion des capteurs de mouvement
        if ((item_websocket['SensorName'].indexOf("Capteur de mouvement") !== -1 || item_websocket['SensorName'].indexOf("172.24.25.14 - Adam5051 - 0 - 0") !== -1) && item_sensor["id_laboratory"] === item_websocket['SensorName']) {
            if (item_websocket['DigitalValue'] === true) {
                $(item_sensor["id"]).css("visibility", "visible");
                
            } else {
                $(item_sensor["id"]).css("visibility", "hidden");
               
            }
        }

        // Gestion de l'animation des objets   
        if (item_websocket['SensorName'] === item_sensor["id_laboratory"]) {
            
            let obj = {
                targets: '.' + item_sensor['className'],
                easing: item_sensor['easing'],
                duration: item_sensor['duration']
            };
            checkItemSensorState(obj, item_websocket, item_sensor);
            anime(obj);
        }
    }
    
}

function loadInterfaceCuisine(item_websocket) {
    for (let j = 0; j < iCuisineSensor['interface_cuisine_face'].length; j++) {

        let item_sensor = iCuisineSensor['interface_cuisine_face'][j];

        //  Gestion des animations des objets
        if (item_websocket['SensorName'] === item_sensor["id_laboratory"]) {
            console.log(item_websocket['SensorName']);
            let obj = {
                targets: '.' + item_sensor['className'],
                easing: item_sensor['easing'],
                duration: item_sensor['duration']
            };
            checkItemSensorState(obj, item_websocket, item_sensor);
            anime(obj);
        }
    }
}

/**
 * 
 * @param {*} transform     Nommée la transform utilisé
 * @param {*} init          Point initial (origine ou final)
 * @param {*} end           Point final   (origine ou final)
 */

var OPEN = 1, CLOSE = 2;
var START = "Start", FINAL = "Final";

function makeTransform(obj, item_sensor, transform, coord, anim) {

    /**
     *      translateXStart ou translateXFinal
     */

    var transformStart = transform + coord + START
    var transformFinal = transform + coord + FINAL;

    if (item_sensor[transformStart] !== undefined) {

        if(anim === OPEN) {

            obj[transform + coord] = {
                value: [item_sensor[transformStart], item_sensor[transformFinal]]
            }

        } else if (anim === CLOSE) {

            obj[transform + coord] = {
                value: [item_sensor[transformFinal], item_sensor[transformStart]]
            }

        }
    }
}

function checkItemSensorState(obj, item_websocket, item_sensor) {
    if (item_websocket['DigitalValue'] === true) {
        makeTransform(obj, item_sensor, "fill", "", OPEN);
        makeTransform(obj, item_sensor, "translate", "X", OPEN);
        makeTransform(obj, item_sensor, "translate", "Y", OPEN);
        makeTransform(obj, item_sensor, "translate", "Z", OPEN);
        makeTransform(obj, item_sensor, "rotate", "", OPEN);
        makeTransform(obj, item_sensor, "rotate", "X", OPEN);
        makeTransform(obj, item_sensor, "rotate", "Y", OPEN);
        makeTransform(obj, item_sensor, "rotate", "Z", OPEN);
        makeTransform(obj, item_sensor, "scale", "", OPEN);
        makeTransform(obj, item_sensor, "scale", "X", OPEN);
        makeTransform(obj, item_sensor, "scale", "Y", OPEN);
        makeTransform(obj, item_sensor, "scale", "Z", OPEN);
        makeTransform(obj, item_sensor, "skew", "X", OPEN);
        makeTransform(obj, item_sensor, "skew", "Y", OPEN);
        makeTransform(obj, item_sensor, "perspective", "", OPEN);
    } else {
        makeTransform(obj, item_sensor, "fill", "", CLOSE);
        makeTransform(obj, item_sensor, "translate", "X", CLOSE);
        makeTransform(obj, item_sensor, "translate", "Y", CLOSE);
        makeTransform(obj, item_sensor, "translate", "Z", CLOSE);
        makeTransform(obj, item_sensor, "rotate", "", CLOSE);
        makeTransform(obj, item_sensor, "rotate", "X", CLOSE);
        makeTransform(obj, item_sensor, "rotate", "Y", CLOSE);
        makeTransform(obj, item_sensor, "rotate", "Z", CLOSE);
        makeTransform(obj, item_sensor, "scale", "", CLOSE);
        makeTransform(obj, item_sensor, "scale", "X", CLOSE);
        makeTransform(obj, item_sensor, "scale", "Y", CLOSE);
        makeTransform(obj, item_sensor, "scale", "Z", CLOSE);
        makeTransform(obj, item_sensor, "skew", "X", CLOSE);
        makeTransform(obj, item_sensor, "skew", "Y", CLOSE);
        makeTransform(obj, item_sensor, "perspective", "", CLOSE);
    }
}