whatinStorage();

function whatinStorage() {
    let products = JSON.parse(localStorage.getItem("cart"));
    resultAPI = products;
    console.log(products);

    let totalPrice = 0
    let totalNumber = 0

    document.getElementById("cart__items").innerHTML = "";
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
            .insertAdjacentHTML("beforeend", `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
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


          let removeItem = document.querySelector(
            `article[data-id="${product._id}"][data-color="${product.color}"] .deleteItem`);
          buttonRemoveProductFromCart(removeItem);

          let quantitySelector = document.querySelector(
            `article[data-id="${product._id}"][data-color="${product.color}"] .itemQuantity`);
          selectChangeQuantity(quantitySelector);

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

function changeQuantity(event, product) {
  let input = event.target;
  let cart = getCart();
  let foundProduct = cart.find(p => p._id == product._id && p.color == product.color)
    foundProduct.quantity = parseInt(input.value);
    console.log(input.value);
    console.log(foundProduct);
    if (foundProduct.quantity == 0) {
      // Supprimer le produit du panier en utilisant la fonction splice
      let index = cart.indexOf(foundProduct);
      cart.splice(index, 1);
      setCart(cart);
      whatinStorage();
    } else {
    setCart(cart);
    whatinStorage();
    }
};

function selectChangeQuantity(input) {
  input
          .addEventListener("change",event => {
            let parentArticle = input.closest("article");
            let id = parentArticle.dataset.id;
            let color = parentArticle.dataset.color;
            let product = {
              _id: id,
              color: color
            };

            changeQuantity(event, product);
});
}



function removeProductFromCart(product) {
  let cart = getCart();
  let updateCart = cart.filter(p => p._id !== product._id || p.color !== product.color);
  setCart(updateCart);
  whatinStorage();
}

function buttonRemoveProductFromCart(element){
  element
          .addEventListener("click",event => {
            if(event.target.classList.contains('deleteItem')){
              let productId = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
              let productColor = event.target.parentElement.parentElement.parentElement.parentElement.dataset.color;
              let product = { _id: productId, color: productColor };
              removeProductFromCart(product);
            }
          })
};  

function checkFormAndPostRequest() {
    const order = document.querySelector("#order");
    const inputFirstName = document.querySelector("#firstName");
    const inputLastName = document.querySelector("#lastName");
    const inputAddress = document.querySelector("#address");
    const inputCity = document.querySelector("#city");
    const inputEmail = document.querySelector("#email");


    const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
    const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
    const addressErrorMsg = document.querySelector("#addressErrorMsg");
    const cityErrorMsg = document.querySelector("#cityErrorMsg");
    const emailErrorMsg = document.querySelector("#emailErrorMsg");

    const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    const addressRegex = /^[\w\s,'-]*$/;
    const cityRegex = /^[a-zA-Z\s-]*$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    inputFirstName.addEventListener("input", function(e){
      if(!nameRegex.test(inputFirstName.value)){
        firstNameErrorMsg.innerHTML = "Veuillez entrer un prénom valide";
      } else {
        firstNameErrorMsg.innerHTML = "";
      }
    });

    inputLastName.addEventListener("input", function(e){
      if(!nameRegex.test(inputLastName.value)){
        lastNameErrorMsg.innerHTML = "Veuillez entrer un prénom valide";
      } else {
        lastNameErrorMsg.innerHTML = "";
      }
    });

    inputAddress.addEventListener("input", function(e){
      if(!addressRegex.test(inputAddress.value)){
        addressErrorMsg.innerHTML = "Veuillez entrer une adresse valide";
      } else {
        addressErrorMsg.innerHTML = "";
      }
    });

    inputCity.addEventListener("input", function(e){
      if(!cityRegex.test(inputCity.value)){
        cityErrorMsg.innerHTML = "Veuillez entrer une ville valide";
      } else {
        cityErrorMsg.innerHTML = "";
      }
    });

    inputEmail.addEventListener("input", function(e){
      if(!emailRegex.test(inputEmail.value)){
        emailErrorMsg.innerHTML = "Veuillez entrer un email valide";
      } else {
        emailErrorMsg.innerHTML = "";
      }
    });
    
    const form = document.querySelector("form");
    let orderInfo;

    order.addEventListener("click", function(e) {
      e.preventDefault();
      let isValid = true;

      if(inputFirstName.value === "") {
        firstNameErrorMsg.innerHTML = "Ce champ est obligatoire";
        isValid = false;
      } else if(!nameRegex.test(inputFirstName.value)){
        firstNameErrorMsg.innerHTML = "Veuillez entrer un prénom valide";
        isValid = false;
      }
      if(inputLastName.value === "") {
        lastNameErrorMsg.innerHTML = "Ce champ est obligatoire";
        isValid = false;
      } else if(!nameRegex.test(inputLastName.value)){
        lastNameErrorMsg.innerHTML = "Veuillez entrer un nom valide";
        isValid = false;
      }
      if(inputAddress.value === "") {
        addressErrorMsg.innerHTML = "Ce champ est obligatoire";
        isValid = false;
      } else if(!addressRegex.test(inputAddress.value)){
        addressErrorMsg.innerHTML = "Veuillez entrer une adresse valide";
        isValid = false;
      }
      if(inputCity.value === "") {
        cityErrorMsg.innerHTML = "Ce champ est obligatoire";
        isValid = false;
      } else if(!cityRegex.test(inputCity.value)){
        cityErrorMsg.innerHTML = "Veuillez entrer une ville valide";
        isValid = false;
      }
      if(inputEmail.value === "") {
        emailErrorMsg.innerHTML = "Ce champ est obligatoire";
        isValid = false;
      } else if(!emailRegex.test(inputEmail.value)){
        emailErrorMsg.innerHTML = "Veuillez entrer un mail valide";
        isValid = false;
      }


  if(isValid) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let idsProduits = cart.map(produit => produit._id);
    // let productsBought = [];
    // productsBought.push(idsProduits)
    let customerInfo = {
      contact: {
        firstName :inputFirstName.value,
        lastName : inputLastName.value,
        address :inputAddress.value,
        city : inputCity.value,
        email : inputEmail.value,
      },
      products : idsProduits,
    };
    console.log(customerInfo);
    orderInfo = customerInfo;

            // -------  Envoi de la requête POST au back-end --------
      // Création de l'entête de la requête
      const options = {
        method: "POST",
        body: JSON.stringify(orderInfo),
        headers: { "Content-Type": "application/json" },
      };
            // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id.
            fetch("http://localhost:3000/api/products/order", options)
            .then(function(res) {
              console.log("succes", res);
              return res.json();
            })
            .then((data) => {
              localStorage.clear();
              console.log(data)

               document.location.href = "confirmation.html?orderId=" + data.orderId;
            })
            .catch((err) => {
              alert("Il y a eu une erreur : " + err);
            });
      }  

    
});


}

checkFormAndPostRequest();