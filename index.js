const express = require('express');
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;
const cors = require('cors');
app.use(cors());
const users = require("./routes/user.js")
mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://DecQmenT:CEDT01@cluster0.a8kqejl.mongodb.net/?retryWrites=true&w=majority")
        .then(() => console.log("Can connect to mongodb\n"))
        .catch((err) => console.err(err))

app.use(express.json())
app.use('/users',users);
app.listen(PORT, () => {
    console.log("\n")
    console.log("server is running")
});

