let WS_auto_reconnect = null;
let WS_origins = [];
let WS_list = [];

function WS_create(url){
    let w = new WebSocket(url);
    w.onmessage = WS_message;
    w.onopen = WS_open;
    w.onclose = WS_close;
    return w;
}
function WS_init(liste){
    WS_origins = liste;
    for(let key in liste){
        WS_list.push(WS_create(liste[key]["url"]));
    }
}
function WS_message(data){
    let origin = WS_getName(data["origin"]);
    window[origin](data);
}
function WS_open(event){
    alertify.success(WS_getName(event.currentTarget.url)+" bien connecté !");
}
function WS_close(event){
    let reason = "Unknown reason";
    if (event.code == 1000)
        alertify.success(WS_getName(event.currentTarget.url)+" déconnecté !");
    else if(event.code == 1001)
        reason = "An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.";
    else if(event.code == 1002)
        reason = "An endpoint is terminating the connection due to a protocol error";
    else if(event.code == 1003)
        reason = "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
    else if(event.code == 1004)
        reason = "Reserved. The specific meaning might be defined in the future.";
    else if(event.code == 1005)
        reason = "No status code was actually present.";
    else if(event.code == 1006)
        reason = "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
    else if(event.code == 1007)
        reason = "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).";
    else if(event.code == 1008)
        reason = "An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.";
    else if(event.code == 1009)
        reason = "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
    else if(event.code == 1010) // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
        reason = "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " + event.reason;
    else if(event.code == 1011)
        reason = "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
    else if(event.code == 1015)
        reason = "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";

    alertify.error(WS_getName(event.currentTarget.url)+" : "+reason);
}
function WS_getName(url){
    for(let key in WS_origins){

        if(WS_origins[key]["url"] == url || WS_origins[key]["url"] == url+"/" ){
            return WS_origins[key]["name"];
        }
    }
    return null;
}

WS_auto_reconnect = setInterval(function(){
    for(let i=0;i<WS_list.length;i++){
        let ws = WS_list[i];
        if(ws.readyState !== ws.OPEN){
            console.log("Trying to reconnect to : ");
            console.log(ws);
            console.log("----------------");
            WS_list[i] = WS_create(ws.url);
        }
    }
},30000);

