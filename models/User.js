const mongoose = require("mongoose");
const validator = require("validator");

//Creating schemas
const User = mongoose.model("User", {
	name: {
		type: String,
		require: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email Is Invalid");
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error("Age Must Be Positive");
			}
		}
	}
});

//IMPORT TO INDEX.JS
module.exports = User;

// new User({
// 	name: "Billy",
// 	age: 24,
// 	email: "endres63@hotmail.com",
// 	password: "Billy1234!"
// }).save();
