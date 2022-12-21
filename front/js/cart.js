whatinStorage();

function whatinStorage() {
    let products = JSON.parse(localStorage.getItem("cart"));
    resultAPI = products;
    console.log(products);

    let totalPrice = 0
    let totalNumber = 0

    document.getElementById("cart__items").innerHTML = "";

      // On itère dans products pour récupérer les informations produits
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

        // On affiche chaque produits présent dans le localStorage et ses informations
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

          // A chaque itération on additionne le prix des produits au prix total
          totalPrice += priceTotalProduct;
          displayTotalPrice(totalPrice);

          // A chaque itération on additionne la quantité des produits à la quantité totale
          totalNumber += product.quantity;
          displayTotalNumber(totalNumber);

        })

    }
}

      // On affiche le prix total du panier
function displayTotalPrice(price) {
  document
    .getElementById("totalPrice")
    .innerText = `${price}`;
}

    // On affiche la quantité totale des produits du panier
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

// On permet de modifier la quantité et on la met à jour dans le localStorage
function changeQuantity(event, product) {
  let input = event.target;
  let cart = getCart();
  let foundProduct = cart.find(p => p._id == product._id && p.color == product.color)
    foundProduct.quantity = parseInt(input.value);
    console.log(input.value);
    console.log(foundProduct);
    // Si la quantité est inférieure ou égale à 0 alors on supprime le produit du local storage et on affiche le nouveau contenu du localStorage
    if (foundProduct.quantity <= 0) {
      let index = cart.indexOf(foundProduct);
      cart.splice(index, 1);
      setCart(cart);
      whatinStorage();
      // On affiche le nouveau contenu du localStorage pour actualiser la nouvelle quantité
    } else {
    setCart(cart);
    whatinStorage();
    }
};
    // On crée un évènement onChange pour obtenir les informations lié au produit sur lequel on veut changer la quantité
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


// On récupère l'id et la couleur du produit que l'on veut supprimer puis on filtre afin de garder uniquement les produits à conserver dans le panier, pour enfin actualiser le nouveau contenu
function removeProductFromCart(product) {
  let cart = getCart();
  let updateCart = cart.filter(p => p._id !== product._id || p.color !== product.color);
  setCart(updateCart);
  whatinStorage();
}

// On crée un évènement onClick pour obtenir l'id et la couleur du produit que l'on veut supprimer
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

// On vérifie que les champs soient remplis et correctement, pour ensuite envoyer un requête POST et obtenir l'orderId
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

    // On affiche un message d'erreur si la Regex n'est pas respectée pour chaque champs
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

    // On vérifie que chaque champs soit correctement rempli puis on envoie un requête POST au back end pour récupérer un numéro de commande
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
            // Envoie de la requête avec l'en-tête. 
            fetch("http://localhost:3000/api/products/order", options)
            .then(function(res) {
              console.log("succes", res);
              return res.json();
            })
            .then((data) => {
              localStorage.clear();
              console.log(data)

              // Redirection vers la page de confirmation avec l'oderId dans l'URL
               document.location.href = "confirmation.html?orderId=" + data.orderId;
            })
            .catch((err) => {
              alert("Il y a eu une erreur : " + err);
            });
      }  

    
});


}

checkFormAndPostRequest();