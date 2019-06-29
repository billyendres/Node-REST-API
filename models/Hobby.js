const mongoose = require("mongoose");
const validator = require("validator");

//Creating schemas
const hobbySchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: true
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
);

const Hobby = mongoose.model("Hobby", hobbySchema);

//IMPORT TO INDEX.JS
module.exports = Hobby;
