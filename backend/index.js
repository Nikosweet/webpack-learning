const express = require('express')
const productsRouter = require('./routes/products.router')
const cors = require('cors');

const app = express();

const port = 5000;

app.use(cors())
app.use(express.json())
app.use('/api', productsRouter)



app.listen(port, () => console.log(`Running on port ${port}`));