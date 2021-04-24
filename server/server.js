const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const { initializeDB } = require("./mongoose")

const productRoutes = require("./routes/products.routes");
const userRoutes = require("./routes/users.routes");
const cartRoutes = require("./routes/carts.routes");
const wishlistRoutes = require("./routes/wishlists.routes");
const addressesRoutes = require("./routes/addresses.routes");
const ordersRoutes = require("./routes/orders.routes");

dotenv.config();


const port = process.env.PORT || 5000;

initializeDB(process.env.URI);

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
   res.send("server is running")
})

app.use("/api",productRoutes);
app.use("/api",userRoutes);
app.use("/api",cartRoutes);
app.use("/api",wishlistRoutes);
app.use("/api",addressesRoutes);
app.use("/api",ordersRoutes);

app.use((err,req,res,next) => {
   console.error(err.stack)
   res.status(500).json({ success: false, message:"route not found on server" ,error:err.message})
})

app.listen(port,() => console.log("server listening on port : ",port))
