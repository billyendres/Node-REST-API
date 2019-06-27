const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

//Creating schemas
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
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

//Finding user by credentials to login
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("Unable to login, email not found");
	}
	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Incorrect Password");
	}
	return user;
};

//Securely encrypting password before saving
//use function not => to access this
userSchema.pre("save", async function(next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

const User = mongoose.model("User", userSchema);

//IMPORT TO INDEX.JS
module.exports = User;
