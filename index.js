const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoutes");
const productRoutes = require('./routes/productRoutes');
const blogRoutes = require('./routes/blogroutes');
const { notFound, errorHandler } = require("./middlewares/errorHandle");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/products", productRoutes);
app.use("/api/blog", blogRoutes);



app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});