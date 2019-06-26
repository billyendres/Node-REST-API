const express = require("express");
const User = require("../models/User");
const Task = require("../models/Task");

const router = new express.Router();
//User Routes - Check mongoose queries for more CRUD info
router.post("/users", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		res.status(201).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get("/users", async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (e) {
		res.status(500).send();
	}
});

router.get("/users/:id", async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.staus(404).send();
		}
		res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

//Task Routes
router.post("/tasks", async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get("/tasks", async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.send(tasks);
	} catch (e) {
		res.status(500).send();
	}
});

router.get("/tasks/:id", async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findById(_id);
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
