const mongoose = require("mongoose");
const validator = require("validator");

//Creating schemas
const Hobby = mongoose.model("Hobby", {
	description: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		required: true
	},
	owner: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "User"
	}
});

//IMPORT TO INDEX.JS
module.exports = Hobby;
