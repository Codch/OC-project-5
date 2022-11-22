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
        const elements = productAPI;
        console.log(elements);

    })
}

getElements();