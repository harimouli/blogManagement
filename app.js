require('dotenv').config();

const express = require('express');

const app = express();

const PORT = 5000 || process.env.PORT;
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const Mongostore = require('connect-mongo');
const session = require('express-session');
const connectDB = require('./server/config/db');
connectDB();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: Mongostore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))
app.use(express.static('public'));


app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");



app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));



app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
    });