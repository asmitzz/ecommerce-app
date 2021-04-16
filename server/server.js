const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const productRoutes = require('./routes/products.routes');
const userRoutes = require('./routes/users.routes');

dotenv.config()

const { connectToDB } = require('./mongoose')

const port = process.env.PORT || 5000;

connectToDB(process.env.URI);

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
   res.send("server is running")
})

app.use("/api",productRoutes);
app.use("/api",userRoutes);

app.listen(port,() => console.log("server listening on port : ",port))
