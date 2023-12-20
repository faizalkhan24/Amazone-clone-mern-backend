const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoutes");
const productRouter = require('./routes/productRoutes');
const blogRouter = require('./routes/blogroutes');
const Blogcategory = require('./routes/BlogCategoryRoutes');
const ProdcutCategoryRouter = require('./routes/ProdcutCategoryRoutes');

const { notFound, errorHandler } = require("./middlewares/errorHandle");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/products", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blog-cat", Blogcategory);
app.use("/api/prod-cat", ProdcutCategoryRouter);





app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});