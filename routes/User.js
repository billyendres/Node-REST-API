const express = require("express");
const User = require("../models/User");

const router = new express.Router();

router.post("/users", (req, res) => {
	const user = new User(req.body);

	user
		.save()
		.then(() => {
			res.send(user);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

module.exports = router;
