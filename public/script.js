const body = document.body;
const themeButton = document.getElementById("themeButton");
const themeIcon = document.getElementById("themeIcon");

const form = document.getElementById('addForm');
const message = document.getElementById('message');
console.log(form);


async function getProducts() {
    const response = await fetch('/api/products');

    if (!response.ok) {
        throw new Error(
            `Shop returned Error ` + response.status
        );
    }

    console.log(response);

    return response.json();
}

function showProducts(products) {
    const list = document.querySelector('#products');
    list.innerHTML = '';

    for (const product of products) {
        const div = document.createElement('div');
        const img = document.createElement('img');
        const name = document.createElement('h3');
        const category = document.createElement('h5');
        const stock = document.createElement('p');
        const price = document.createElement('p');

        div.classList.add('box');

        // Image
        img.src = `/assets/${product.name}.jpg`;
        img.alt = product.name;

        img.oneerror = () => {
            img.src = '/assets/placeholder.jpg';
        }

        name.textContent = product.name;

        category.classList.add('pill');
        category.textContent = product.category;
        
        if (product.stock > 0) {
            stock.textContent = `Stock: ${product.stock}`;
        } else {
            stock.textContent = `Out of Stock`;
        }


        price.classList.add('price');
        price.textContent = `£${product.price}`;
        
        div.append(img, name, category, stock, price);
        list.appendChild(div);
    }
}

function addDropdowns(products) {
    const div = document.createElement('select')
    const catItem = document.createElement('option');

    
}

async function getProducts(category = '', sort = '') {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (sort) params.set('sort', sort);
        const response = await fetch(`/api/products?${params}`);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
}

async function refresh() {
    const category = document.getElementById('categoryFilter').value;
    const sort = document.getElementById('sortFilter').value;
    showProducts(await getProducts(category, sort));
}

document.getElementById('categoryFilter').addEventListener('change', refresh);
document.getElementById('sortFilter').addEventListener('change', refresh);

function changeTheme() {
    alert('sfgkjs');

    // True is Dark Mode
    // False is Light Mode
    let use_theme = false;

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

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        console.log('1. Form submitted');

        const body = {
            name: document.getElementById('name').value,
            price: Number(document.getElementById('price').value),
            category: document.getElementById('category').value,
            stock: Number(document.getElementById('stock').value)
        };

        console.log('2. Form data:', body);

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            console.log('3. Response status:', response.status);

            const data = await response.json();

            console.log('4. Server response:', data);

            if (response.ok) {
                message.textContent = `Added: ${data.name} (id ${data.id})`;

                const products = await getProducts();

                console.log('5. Updated products:', products);

                showProducts(products);

                form.reset();
            } else {
                message.textContent = `Error: ${data.error}`;
            }

        } catch (error) {
            console.error('Form error:', error);
            message.textContent = 'Could not reach the server';
        }
    });
}

themeButton.addEventListener("click", changeTheme);

init();