const express = require("express");
const mongoose = require("mongoose");
//Import keys and mongoURI
const keys = require("./config/keys");

//ROUTES
const userRouter = require("./routes/User");
const taskRouter = require("./routes/Task");

//Connect private keys
mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true,
	useCreateIndex: true
});

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//Only runs this code if in production - Heroku Deploy
if (process.env.NODE_ENV === "production") {
	// Express will serve up production assets ( main.js, main.css etc)
	app.use(express.static("client/build"));
	//Express will serve up Index.html if it doesn't recognise the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

//Setup Dynamic PORT
const PORT = process.env.PORT || 5600;

//Heroku Open to start
//Install nodemon add to package.json
//npm run dev to start server
app.listen(PORT, () => console.log(`server on port ${PORT}`));
