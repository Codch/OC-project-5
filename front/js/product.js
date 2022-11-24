let getPageURL = window.location.href;
console.log(getPageURL)

var url = new URL(getPageURL);
var id = url.searchParams.get("id");
console.log(id);

function getElements() {
    fetch("http://localhost:3000/api/products/"+id)
    .then(function(res) {
        console.log("succes", res);
        return res.json();
    })

    .catch(function(error){
        console.log("error", error);

    })

    .then(function(productAPI) {
        const products = productAPI;
        console.log(products);

            let img = document.createElement("img");
            document
                    .querySelector(".item__img")
                    .appendChild(img)
            img.src = products.imageUrl;
            img.alt = products.altTxt;

            document
                    .getElementById("title")
                    .innerText = products.name;

            document
                    .getElementById("price")
                    .innerText = products.price;

            document
                    .getElementById("description")
                    .innerText = products.description;
        

    })
}

getElements();