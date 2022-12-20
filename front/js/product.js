let getPageURL = window.location.href;
console.log(getPageURL)

const productCardImg = document.querySelector(".item__img");
const productCardName = document.getElementById("title");
const productCardDescription = document.getElementById("description");
const productCardPrice = document.getElementById("price");
const productCardSelectColor = document.getElementById("colors");

var url = new URL(getPageURL);
var id = url.searchParams.get("id");
console.log(id);

function getElements() {
        // On récupère les informations sur le produit en question
    fetch("http://localhost:3000/api/products/"+id)
    .then(function(res) {
        console.log("succes", res);
        return res.json();
    })

    .catch(function(error){
        console.log("error", error);

    })

        // On affiche sur la page les informations concernant le produit
    .then(function(productAPI) {
        const products = productAPI;
        console.log(products);

                let img = document.createElement("img");
                productCardImg
                        .appendChild(img)
                img.src = products.imageUrl;
                img.alt = products.altTxt;

                productCardName
                        .innerText = products.name;

                productCardPrice
                        .innerText = products.price;

                productCardDescription
                    .innerText = products.description;

            let colors = products.colors;
            for(let color of colors) {
                productCardSelectColor
                .insertAdjacentHTML("beforeend", `<option value=${color}>${color}</option>`);
            }
    })
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
        // On vérifie l'exactitude des informations choisis par l'utilisateur et on les ajoute au localStorage
function addToCart() {
        const addToCartBtn = document.getElementById("addToCart");
        

        addToCartBtn.addEventListener("click", function() {

                const addToCartColor = productCardSelectColor.value;
                const addToCartNumber = parseInt(document.getElementById("quantity").value);

                console.log(addToCartNumber)
                console.log(addToCartColor)

                let productAdd = {
                        quantity: addToCartNumber,
                        _id: id,
                        color: addToCartColor,
                      };

                if(addToCartNumber < 1 || addToCartNumber > 100) {
                         alert("Choisissez une quantité entre 1 et 100.");
                        
                } else if(addToCartColor === "") {
                         alert("Veuillez choisir une couleur.");
                        
                } else {                                        
                        let cart = getCart();
                        let foundProduct = cart.find(p => p._id == productAdd._id && p.color == productAdd.color);
                        if(foundProduct){
                                foundProduct.quantity += productAdd.quantity
                                setCart(cart);
                        } else {
                                cart.push(productAdd);
                                setCart(cart);
                        }

                }
                
        })
};



getElements(); 

addToCart();