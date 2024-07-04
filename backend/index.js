const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
require('dotenv').config();

const app = express();

// CONNECT TO THE FRONTEND SITE
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
)

// USE COOKIES
app.use(cookieParser());

// GET FRONTEND INPUTS VALUES
app.use(express.json());

// SETUP THE ROUTES
app.use('/api/refresh')
app.use('/api/user',userRoute);

const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})