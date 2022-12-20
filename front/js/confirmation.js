const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("orderId");

function displayOrderId() {
    document
        .getElementById("orderId")
        .innerHTML = `${orderId}`
}

displayOrderId();