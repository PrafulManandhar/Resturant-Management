const express= require("express");
const app = express();

//Body Parser Middleware
const bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const cors = require("cors");
app.use(cors());

const order=require("./routes/api/order");
//Routes
app.use("/api/order",order);

const category=require("./routes/api/category");
//Routes
app.use("/api/category",category);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server is running on port ${port} `));