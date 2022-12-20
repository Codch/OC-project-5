const urlParams = new URLSearchParams(window.location.search);

// On récupère l'oderId dans l'URL
const orderId = urlParams.get("orderId");


// On affiche le numéro de commande
function displayOrderId() {
    document
        .getElementById("orderId")
        .innerHTML = `${orderId}`
}

displayOrderId();