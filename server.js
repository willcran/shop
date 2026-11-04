const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

console.log("Server started");

const productRoutes = require('./routes/products');

app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok'});
});

app.listen(PORT, () => {
    console.log(`Shop server running at http://localhost${PORT}`);
});