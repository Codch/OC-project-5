function getArticles() {

    // Effectue une requête HTTP vers l'URL de l'API pour récupérer des données de produits

    fetch("http://localhost:3000/api/products")

    .then(function (res) {
        console.log("succes", res);
        return res.json();
    })

    .catch(function(error){
        console.log("error", error);
        document
            .getElementById("items")
            .innerTEXT = "Nous n'avons pu afficher les produits, vérifiez le chemin vers l'API et assurez vous d'avoir lancé le serveur local (Port 3000).";
    })

    .then(function(productsAPI){
        const products = productsAPI;
        console.log(products);

        // Itère sur chaque produit dans l'objet "products" et crée un contenu HTML pour chacun d'entre eux
        for (let product of products) {
            let productCard = document.createElement("a");
            document.getElementById("items").appendChild(productCard);
            productCard.href = './product.html?id='+product._id;

            let article = document.createElement("article");
            productCard.appendChild(article);

            let img = document.createElement("img");
            article.appendChild(img);
            console.log(product.imageUrl);
            img.src = product.imageUrl;
            img.alt = product.altTxt;

            let h3 = document.createElement("h3");
            h3.classList.add("productName");
            article.appendChild(h3);
            h3.innerText = product.name;

            let description = document.createElement("p");
            description.classList.add("productDescription");
            article.appendChild(description);
            description.innerText = product.description;

            let price = document.createElement("p");
            article.appendChild(price);
            price.innerText = product.price +"€";
            
            
            
        }
    })
}

getArticles()