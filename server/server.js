const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const productRoutes = require('./routes/products.routes');
const userRoutes = require('./routes/users.routes');
const cartRoutes = require('./routes/carts.routes');

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
app.use("/api",cartRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check"})
})

app.use((err,req,res,next) => {
   console.error(err.stack)
   res.status(500).json({ success: false, message:"route not found on server" ,error:err.message})
})

app.listen(port,() => console.log("server listening on port : ",port))
