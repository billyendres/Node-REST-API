//Figure out if in dev or production mode
if (process.env.NODE_ENV === "production") {
	//in production - return prodKeys
	module.exports = require("./prodKeys");
} else {
	//in development, return devKeys
	module.exports = require("./devKeys");
}
