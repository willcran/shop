const express = require('express');
const router = express.Router();

const products = [
    { id: 1, name: "Oven", price: 200, category: 'appliances', stock: 0, 'image': "/assets/oven.jpg"},
    { id: 2, name: "Kettle", price: 200, category: 'applications', stock: 70},
    { id: 3, name: "Washing-Machine", price: 5, category: 'appliances', stock: 4},
    { id: 4, name: "Sink", price: 20, category: 'misc', stock: 1},
    { id: 5, name: "Microwave", price: 8, category: 'appliance', stock: 7},
    { id: 6, name: "Toaster", price: 10, category: 'appliance', stock: 10}
];

router.get('/', (req, res) => {
    res.json(products);
});

function parseId(id) {
    const num = Number(id);

    if (Number.isInteger(num)) {
        return num;
    } else {
        throw new Error(
            `Error: ` + response.status
        );
    }
}

router.get('/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
        return res.status(400).json({
            error: 'Invalid product ID'
        });
    }

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            error: 'Product not found'
        });
    }

    res.json(product);
});


module.exports = router;