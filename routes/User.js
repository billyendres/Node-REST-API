const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = new express.Router();

//User Routes - Check mongoose queries for more CRUD info
router.post("/users", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

//Defined own function to find users credentials
//Create new schema in user models
router.post("/users/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		res.status(400).send();
	}
});

//Allows user to logout of a single device with token
//(not multiple devices at once ie. computer & phone)
router.post("/users/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(token => {
			return token.token !== req.token;
		});
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

//Logs users out of all devices
router.post("/users/logoutAll", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

//Passing in auth middleware as 2nd function
//Before route handle runs
//RH only runs if next() is called from auth
router.get("/users/profile", auth, async (req, res) => {
	res.send(req.user);
});

//Update Profile
router.patch("/users/profile", auth, async (req, res) => {
	//Checks if update is valid
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "email", "password", "age"];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid Update" });
	}
	//Dynamically update user properties with middleware
	try {
		updates.forEach(update => (req.user[update] = req.body[update]));
		await req.user.save();

		res.send(req.user);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete("/users/profile", auth, async (req, res) => {
	try {
		await req.user.remove();
		res.send(req.user);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
