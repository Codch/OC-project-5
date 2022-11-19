let getPageURL = window.location.href;
console.log(getPageURL)

var url = new URL(getPageURL);
var id = url.searchParams.get("id");
console.log(id);

fetch("http://localhost:3000/api/products/"+id)
    .then(function(res) {
        console.log("succes", res);
    })

    