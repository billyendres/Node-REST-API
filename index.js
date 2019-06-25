const express = require("express");
const mongoose = require("mongoose");
//Lets express know how to handle cookies from passport.js
//Import keys and mongoURI
const keys = require("./config/keys");

//Connect private keys
mongoose.connect(keys.mongoURI);

const app = express();

//Setup Dynamic PORT
const PORT = process.env.PORT || 5500;

//Heroku Open to start
//Install nodemon add to package.json
//npm run dev to start server
//navigate to PORT/auth/google to login
app.listen(PORT, () => console.log(`server on port ${PORT}`));
