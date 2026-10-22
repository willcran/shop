const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

console.log("Server started");

const products = [
    { id: 1, name: "Oven", price: 200, category: 'appliances', stock: 0, 'image': "/assets/oven.jpg"}
    // { id: 2, name: "Kettle", price: 200, category: 'applications', stock: 70},
    // { id: 3, name: "Washing-Machine", price: 5, category: 'appliances', stock: 4},
    // { id: 4, name: "Sink", price: 20, category: 'misc', stock: 1},
    // { id: 5, name: "Microwave", price: 8, category: 'appliance', stock: 7},
    // { id: 6, name: "Toaster", price: 10, category: 'appliance', stock: 10}
];

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok'});
});

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.get('/', (req, res) => {
    res.send('ksjngfisngkjh');
}); 


app.listen(PORT, () => {
    console.log(`Shop server running at http://localhost${PORT}`);
});
