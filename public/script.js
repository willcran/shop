

async function getProducts() {
    const response = await fetch('http://localhost:3000/api/products');

    if (!response.ok) {
        throw new Error(
            `GitHub returned Error ` + response.status
        );
    }

    console.log(response);

    return response.json();
}

function showProducts(products) {
    const list = document.querySelector('#products');
    list.innerHTML = '';

    for (const product of products) {
        const div = document.createElement('div')
        const name = document.createElement('h3');
        const category = document.createElement('h5');
        const stock = document.createElement('p');
        const price = document.createElement('p');

        div.classList.add('box');

        name.textContent = product.name;
        category.textContent = product.category;
        stock.textContent = product.stock;

        price.classList.add('price');
        price.textContent = `£${product.price}`;
        
        div.append(name, category, stock, price);
        list.appendChild(div);
    }
}

async function init() {
    const list = document.querySelector('#products');

    try {
        showProducts(await(getProducts()));
    } catch {
        console.log(`Products list was not shown. Not my fault.`);
        list.textContent = "Products list was not shown. Not my fault."
    }
}

init();