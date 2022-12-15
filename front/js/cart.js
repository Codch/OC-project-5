

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
                  <p id="${product.color}${product._id}" class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`);
          totalPrice += priceTotalProduct;
          displayTotalPrice(totalPrice);
          totalNumber += product.quantity;
          displayTotalNumber(totalNumber);

          let removeItem = `#${product.color}${product._id}`;
          buttonRemoveProductFromCart(removeItem, product);

          // let selectInput = document.querySelector("div.cart__item__content__settings__quantity input[name='itemQuantity']");
          // changeQuantity(selectInput);
        })

    }
}

function displayTotalPrice(price) {
  document
    .getElementById("totalPrice")
    .innerText = `${price}`;
}

function displayTotalNumber(number) {
  document
    .getElementById("totalQuantity")
    .innerText = `${number}`;
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
  let cart = localStorage.getItem("cart");
  if(cart == null){
          return[]
  }else{
          console.log(cart);
          return JSON.parse(cart);
  }
}

// function changeQuantity(product, quantity) {
//   let cart = getCart();
//   let foundProduct = cart.find(p => p._id == product._id)
//   if(foundproduct != undefined) {
//     foundProduct.
//   }
// }

  // newQuantity.addEventListener("change", function() {
                                        
  //   let cart = getCart();
  //   let foundProduct = cart.find(p => p._id == productAdd._id && p.color == productAdd.color);
  //   if(foundProduct){
  //           foundProduct.quantity == newQuantity.value;
  //           setCart(cart);
  //   } else {
  //           cart.push(productAdd);
  //           setCart(cart);
  //   }
  // })
// };

function removeProductFromCart(product) {
  let cart = getCart();
  cart = cart.filter(p => !(p._id == product._id && p.color == product.color));
  setCart(cart);
}

function buttonRemoveProductFromCart(element, product){
  document.querySelector(element)
          .addEventListener("click",() => removeProductFromCart(product))
};  


// function buttonRemoveProductFromCart(){
//   document.querySelector("div.cart__item__content__settings__quantity input[name='itemQuantity']")
//           .addEventListener("click", function {
//             removeProductFromCart(product);
//           })
// }

// function selectProductToRemove() {
//   document.querySelector(".deleteItem")
//           .addEventListener("click", function() {

//           })
// }

whatinStorage();