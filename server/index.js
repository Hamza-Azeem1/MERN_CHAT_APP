const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const { app, server } = require('./socket/index');

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

// API endpoints
app.use('/api', router);

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    });
});
