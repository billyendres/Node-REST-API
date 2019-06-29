const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Hobby = require("./Hobby");

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
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
});

userSchema.virtual("hobbies", {
	ref: "Hobby",
	localField: "_id",
	foreignField: "owner"
});

//Return public profile, not password/ auth token
userSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	delete userObject.tokens;
	return userObject;
};

//Setup JWT auth
//Save to db
userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "thisisthejwt");
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

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

// Delete Hobbies when user deletes profile
userSchema.pre("remove", async function(next) {
	const user = this;
	await Hobby.deleteMany({ owner: user._id });
	next();
});

const User = mongoose.model("User", userSchema);

//IMPORT TO INDEX.JS
module.exports = User;
