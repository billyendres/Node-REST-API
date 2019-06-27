const mongoose = require("mongoose");
const validator = require("validator");

//Creating schemas
const Task = mongoose.model("Task", {
	description: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		required: true
	}
});

//IMPORT TO INDEX.JS
module.exports = Task;
