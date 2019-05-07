# Interface du Liara

Interfaces pour le laboratoire du LIARA utilisant les différents capteurs.

## Technologies utilisées

Frameworks utilisés pour les interfaces:
* Boostrap
* AnimeJS
* font-awesome
* jquery
* alertify.js
* popper.js

## Déploiement

```
git clone https://github.com/LIARALab/Lab-GUI.git
docker build --rm -f "Dockerfile" -t lab-gui:1.0 .
docker run --restart=always -d -p 80:80/tcp lab-gui:1.0
```

## Pour le developpement en local

Il est nécessaire d'avoir un serveur web sans quoi les animations ne fonctionneront pas. Par exemplde, l'extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) compatible avec [Visual Studio Code](https://code.visualstudio.com/).

## Utilisation

Avant de pouvoir utiliser l'interface correctement il faut :

* Se connecter au reseau caché du laboratoire :
    * SSID : **Liara**
    * Password :   **liara_lab**

* Démarrer un serveur local

L'application démarre lorsque le nagivateur est ouvert. Elle va chercher à se connecter au websockets dont les informations de connexion se trouvent dans le fichier ```config.json```.

Si la connexion aux websockets est un succès, les messages suivant apparaitront dans le coin inférieur droit : 

![alt text](https://github.com/LIARALab/Lab-GUI/blob/master/ressource/img_readme/succes.PNG)

Sinon ces messages apparaitront :

![alt text](https://github.com/LIARALab/Lab-GUI/blob/master/ressource/img_readme/closed.PNG)

Pour changer d'interface, simplement glisser la souris vers la cuisine et clicker (dans l'interface du dessus) :

![alt text](https://github.com/LIARALab/Lab-GUI/blob/master/ressource/img_readme/hover_cuisine.png)

et vers la gauche dans l'interface de la cuisine et clicker :

![alt text](https://github.com/LIARALab/InterfaceCuisine/blob/master/ressource/img_readme/hover_gauche.png)

## Exemples

### Fonctionnement des animations
* `Config.json` :
  
```
{
    "id_laboratory": "Porte du refrigerateur",
    "className": "animPorteFrigoBas",           ***
    "skewYStart": 0,
    "skewYFinal": 10,
    "scaleXStart": 1,
    "scaleXFinal": 0.8,
    "translateXStart": 0,
    "translateXFinal": 215,
    "translateYStart": 0,
    "translateYFinal": -190,
    "easing": "linear",
    "duration" : 750
}
 ```

 * `interface_cuisine_face.html` (ou autre), à l'intérieur de la balise ```<svg></svg>```. Il est bien important d'utiliser le ```className``` du fichier `congig.json`

 ```
 <!--    Anim    -->
 <rect id="porte_inferieur"            //identifiant de l'objet
       class="animPorteFrigoBas  ***   //className de config.json 
       texture_metal_vbrush"           //situé dans texture.css                
       x="1072"   y="338.5"            //emplacement
       width="259.5" height="384"      //dimension
 />  
                
 ```
 * Transformations possibles (Final est la position final de l'animation lorsque le senseur est "ouvert") : 

   * "translateXStart" <=> "translateXFinal"
   * "translateYStart" <=> "translateYFinal"
   * "translateZStart" <=> "translateZFinal"
   * "rotateStart"  <=> "rotateFinal"         //3D
   * "rotateXStart" <=> "rotateXFinal"
   * "rotateYStart" <=> "rotateYFinal"
   * "rotateZStart" <=> "rotateZFinal"
   * "scaleStart" <=> "scaleFinal"            //3D   
   * "scaleXStart" <=> "scaleXFinal"
   * "scaleYStart" <=> "scaleYFinal"
   * "scaleZStart" <=> "scaleZFinal"
   * "skewXStart" <=> "skewXFinal"
   * "skewYStart" <=> "skewYFinal"
   * "perspectiveStart" <=> "perspectiveFinal"
  
### Ajouter un sensor et une nouvelle interface

* `config.json` :

Comme chaque interface utilise des animations différentes, il faut tout d'abord créer un hierarchie pour chaque interface dans la section "sensor" :

 ```
 "sensor": [
    {
    "interface_salle_dessus": [
        {
            *****Liste de senseurs
        }
       ]
    },
    "interface_cuisine_face": [
        {
            ****Liste de senseurs
        }
        ]
    },
    ...
        
 ```
 
 Ensuite, il faut ajouter un sensor dans la section liste de sensors. La majorité des capteurs sont déjà identifiés, mais s'il en manque, tester dans WebsocketsFunctions avec
 ```console.log(item_websocket['SensorName']);``` pour afficher les capteurs présents dans le laboratoire dans la console du navigateur.
 
 ```
{
    "id_laboratory": "Capteur magn\u00E9tique porte salle de conf\u00E9rence",
    "className": "animPorteSalleConference",
    "rotateStart": 0,
    "rotateFinal": -90,
    "easing": "linear",
    "duration" : 750
},
 ```
 
 * `initialisation.js`
 
 Assurez vous d'initialiser le tableau de sensors pour votre interface.
 
 1. Initialiser le tableau
 2. Assigner les données au tableau

 ```
let iPrincipaleSensor = [];
let iCuisineSensor = [];

iPrincipaleSensor = data['sensor'][0];
iCuisineSensor = data['sensor'][1];
```
 
 * `WebsocketFunctions.js`
 
 Dans la section  ```function Objects(event)``` ajouter une boucle  ```for``` :.

```
for (let j = 0; j < iCuisineSensor['interface_cuisine_face'].length; j++) {

    // *** À changer pour votre interface
    let item_sensor = iCuisineSensor['interface_cuisine_face'][j];

    //Animation des objets
    
    if (item_websocket['SensorName'] === item_sensor["id_laboratory"]) {
        console.log(item_websocket['SensorName']);
        let obj = {
            targets: '.' + item_sensor['className'],
            easing: item_sensor['easing'],
            duration: item_sensor['duration']
        };
        
        //   Initialiser les transformations pour l'objet
        checkItemSensorState(obj, item_websocket, item_sensor);
        
        //   Animer l'object
        anime(obj);
    }
}
```