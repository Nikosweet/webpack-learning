require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sellerRouter = require('./router/seller.router');
const productRouter = require('./router/product.router');
const buyerRouter = require('./router/buyer.router');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/buyer', buyerRouter);
app.use(errorMiddleware)

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  } catch (e) {
    console.log(e)
  }
}

start()