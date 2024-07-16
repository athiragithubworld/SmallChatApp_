// const http = require('http');

const express = require('express')
const parser = require('body-parser')
const bodyParser = require('body-parser')

const app = express();

const loginRoutes = require("./routes/login")
const chatRoutes = require("./routes/chat");


app.use(bodyParser.urlencoded({ extended: false }));

app.use("/login", loginRoutes);
app.use("/chat", chatRoutes);

app.listen(4000)