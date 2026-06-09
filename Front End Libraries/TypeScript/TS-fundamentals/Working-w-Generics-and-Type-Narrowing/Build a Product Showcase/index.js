"use strict";
class Collection {
    items;
    constructor(items) {
        this.items = items;
    }
    getAll() {
        return this.items;
    }
    filter(callback) {
        return this.items.filter(callback);
    }
}
const isValidItem = (item) => {
    const i = item;
    // common props checks
    if (!("id" in i) || typeof i.id !== "string")
        return false;
    if (!("price" in i) || typeof i.price !== "number")
        return false;
    return true;
};
const isValidProduct = (item) => {
    // check for type object and not null
    const isValid = (obj) => {
        return typeof obj === "object" && obj !== null;
    };
    if (!isValid(item))
        return false;
    // cast item as object wiht string keys and flexible values
    const i = item;
    //product specific checks
    if (i.type === "book") {
        return typeof i.title === "string" && typeof i.author === "string";
    }
    if (i.type === "electronics") {
        return typeof i.item === "string" && typeof i.model === "string";
    }
    if (i.type === "clothing") {
        return typeof i.item === "string" && typeof i.brand === "string";
    }
    return false;
};
const renderProduct = (product) => {
    let header = "";
    let book = "";
    let electro = "";
    let clothes = "";
    try {
        if (product.type === "book") {
            if (isValidProduct(product)) {
                book += ` 
       
        <p><strong>Book: </strong>${product.title} by ${product.author}</p>`;
            }
        }
        if (product.type === "electronics") {
            if (isValidProduct(product)) {
                electro += `
        
      <p><strong>Electronics: </strong>${product.item} - ${product.model} ${product.warranty ? `- Warranty: ${product.warranty} year(s)` : null}</p>
      `;
            }
        }
        if (product.type === "clothing") {
            if (isValidProduct(product)) {
                clothes += `
        
      <p><strong>Clothing: </strong>${product.item} by ${product.brand} ${product.size ? `- Size ${product.size}` : null}</p>`;
            }
        }
        if (isValidItem(product)) {
            header += `<div class='item' id='${product.id}'>
       ${product.type === "book" ? book : product.type === "electronics" ? electro : clothes}
    <div class='price'>$${product.price.toFixed(2)}</div>
   
    </div>`;
        }
        else {
            throw new Error(`Unknown product type: ${JSON.stringify(product)}`);
        }
        return header;
    }
    catch (error) {
        throw new Error(`Unknown product type: ${JSON.stringify(product)}`);
    }
};
const products = new Collection([
    {
        type: "book",
        id: "12",
        price: 20,
        title: "The Fisherman",
        author: "Chigozie Obioma",
    },
    {
        type: "book",
        id: "13",
        price: 30,
        title: "Moby Dick",
        author: "Herman Melville",
    },
    {
        type: "electronics",
        id: "aae34",
        price: 890,
        item: "laptop",
        model: "VivoBook",
        warranty: 9,
    },
    {
        type: "clothing",
        id: "34kk",
        item: "jeans",
        price: 50,
        brand: "Lewis",
        size: "M",
    },
]);
const showProducts = (type) => {
    const output = document.querySelector("#output");
    if (output) {
        output.innerHTML = "";
        if (type) {
            const filtered = products.filter(p => p.type === type);
            output.innerHTML += filtered.map(p => renderProduct(p)).join("");
        }
        else {
            output.innerHTML += products
                .getAll()
                .map(p => renderProduct(p))
                .join("");
        }
    }
};
const btns = document.querySelector(".buttons");
if (btns) {
    btns.addEventListener("click", e => {
        const element = e.target;
        if (element.id === "books") {
            const productType = element.id.slice(0, -1);
            showProducts(productType);
        }
        else if (element.id === "electronics") {
            showProducts("electronics");
        }
        else if (element.id === "clothing") {
            showProducts("clothing");
        }
        else {
            showProducts();
        }
    });
}
document.addEventListener("DOMContentLoaded", () => showProducts());
//# sourceMappingURL=index.js.map