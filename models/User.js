const mongoose = require("mongoose");
const { Schema } = mongoose;

//Creating schemas
const userSchema = new Schema({
	name: {
		type: String
	},
	age: {
		type: Number
	}
});

//Tells mongoose to create a new db collection called users
mongoose.model("users", userSchema);
//IMPORT TO INDEX.JS
// const User = mongoose.model("users");
// new User({ name: "Billy", age: 24 }).save();
