function printObjectRFID(cb, idElement) {
    if (cb.checked && tabObjetRFID.indexOf(idElement) === -1) {
        tabObjetRFID.push(idElement);
        if ($('.checkbox_rfid:checked').length === $('.checkbox_rfid').length){
            $("#select_all").prop('checked', true);
        }
    } else if(!cb.checked && tabObjetRFID.indexOf(idElement) !== -1) {
        tabObjetRFID.splice(tabObjetRFID.indexOf(idElement),1);
        document.getElementById(idElement).style.opacity = '0';
        $("#select_all").prop('checked', false);
    }
}