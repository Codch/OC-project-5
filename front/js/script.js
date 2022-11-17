function getArticles() {
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
        for (let product of products) {
            let productCard = document.createElement("a");
            productCard.classList.add("product");
            productCard.innerText = "coucou";
            document.getElementById("items").appendChild(productCard);

            let article = document.createElement("article");
            productCard.appendChild(article);
            article.innerText = "yo";

            let img = document.createElement("img");
            article.appendChild(img);
            console.log(product.imageUrl);
            img.src = product.imageUrl;
            
            
            // img.src = "../../back/images/kanap01.jpeg";
            
        }
    })
}

getArticles()