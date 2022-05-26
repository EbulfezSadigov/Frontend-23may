"use strict"

let tbody = document.querySelector("table tbody");
let removeAll = document.querySelector(".remove-all");
let removeSpecs;

function renderPage() {
    tbody.innerHTML = "";
    if (localStorage.getItem("favourites") === null || JSON.parse(localStorage.getItem("favourites")).length === 0) {
        let tr = "<tr><td colspan='4' class='text-center text-danger fw-bold'>No items</td></tr>"
        removeAll.classList.add("d-none")
        tbody.innerHTML += tr;
    }
    else {
        let favourites = JSON.parse(localStorage.getItem("favourites"));
        let total = 0;
        for (const product of favourites) {
            let tr = `
            <tr>
                <td><img src='${product.image}'></td>
                <td>${product.name}</td>
                <td>${product.desc}</td>
                <td class='price'>${product.price} * ${product.count}</td>
                <td><button class="btn btn-danger remove-spec" data-id="${product.id}"><i class="bi bi-trash"></i></button></td>
            </tr>
            `
            tbody.innerHTML += tr;

            let amount = product.price.replace("$", "");
            amount = parseInt(amount);
            total += amount * product.count;
        }

        let subtotalTr = `
        <tr>
            <td colspan='3' class='text-end'>Subtotal:</td>
            <td colspan='2' class='price'>$${total}</td>
        </tr>
        `
        tbody.innerHTML += subtotalTr;

    }
    removeSpecs = document.querySelectorAll(".remove-spec");
    
    for (const item of removeSpecs) {
        item.addEventListener("click", function () {
            let favourites = JSON.parse(localStorage.getItem("favourites"));
            favourites = favourites.filter(product => product.id != item.getAttribute("data-id"));
            localStorage.setItem("favourites", JSON.stringify(favourites));
            renderPage();
        })
    }
}

renderPage();

removeAll.addEventListener("click", function () {
    localStorage.removeItem("favourites");
    renderPage();
})


