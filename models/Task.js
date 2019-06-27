const mongoose = require("mongoose");
const validator = require("validator");

//Creating schemas
const Task = mongoose.model("Task", {
	description: {
		type: String,
		require: true
	},
	completed: {
		type: Boolean,
		required: true
	}
});

//IMPORT TO INDEX.JS
module.exports = Task;
