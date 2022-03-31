const express = require('express');
const productRouter = require('./routes/productRoute');
const cartRouter = require('./routes/cartRoute');
var bodyParser = require('body-parser')

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// server
app.listen('8080', () => console.log('server started at port 8080'));
