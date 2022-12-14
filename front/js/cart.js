

function whatinStorage() {
    let products = JSON.parse(localStorage.getItem("cart"));
    console.log(products);

    let totalPrice = 0
    let totalNumber = 0

    for ( let product of products){
        console.log(product._id);
        console.log(product);
        fetch("http://localhost:3000/api/products/"+product._id)
        .then(function(res) {
            console.log("succes", res);
            return res.json();
        })
    
        .catch(function(error){
            console.log("error", error);
    
        })

        .then(function(res){
            console.log(res);
            let priceTotalProduct = res.price * product.quantity;
            console.log(priceTotalProduct);
            document
            .getElementById("cart__items")
            .insertAdjacentHTML("beforeend", `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
              <img src="${res.imageUrl}" alt="${res.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${res.name}</h2>
                <p>${product.color}</p>
                <p>${priceTotalProduct} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`);
          totalPrice += priceTotalProduct;
          displayTotalPrice(totalPrice);
          totalNumber += product.quantity;
          displayTotalNumber(totalNumber);
        })
    }
}

function displayTotalPrice(price) {
  document
    .getElementById("totalPrice")
    .innerText = `"${price}"`;
}

function displayTotalNumber(number) {
  document
    .getElementById("totalQuantity")
    .innerText = `"${number}"`;
}

// function deleteProduct() {
//   document
//     .
// }

whatinStorage();