const express = require("express");
const Hobby = require("../models/Hobby");
const auth = require("../middleware/auth");
const router = new express.Router();

//Hobby Routes
router.post("/hobbies", auth, async (req, res) => {
	const hobby = new Hobby({
		...req.body,
		owner: req.user._id
	});
	try {
		await hobby.save();
		res.status(201).send(hobby);
	} catch (e) {
		res.status(400).send(e);
	}
});

//Pagination & Sorting
router.get("/hobbies", auth, async (req, res) => {
	try {
		await req.user
			.populate({
				path: "hobbies",
				match,
				options: {
					limit: parseInt(req.query.limit),
					sort: {
						createdAt: -1
					}
				}
			})
			.execPopulate();
		res.send(req.user.hobbies);
	} catch (e) {
		res.status(500).send();
	}
});

router.get("/hobbies/:id", auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const hobby = await Hobby.findOne({ _id, owner: req.user._id });
		if (!hobby) {
			return res.status(404).send();
		}
		res.send(hobby);
	} catch (e) {
		res.status(500).send();
	}
});

router.patch("/hobbies/:id", auth, async (req, res) => {
	//Checks if update is valid
	const updates = Object.keys(req.body);
	const allowedUpdates = ["description"];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid Update" });
	}

	try {
		const hobby = await Hobby.findOne({
			_id: req.params.id,
			owner: req.user._id
		});
		if (!hobby) {
			return res.status(404).send();
		}
		updates.forEach(update => (hobby[update] = req.body[update]));
		await hobby.save();
		res.send(hobby);
	} catch (e) {
		res.status(400).send();
	}
});

router.delete("/hobbies/:id", auth, async (req, res) => {
	try {
		const hobby = await Hobby.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id
		});
		if (!hobby) {
			return res.status(404).send();
		}
		res.send(hobby);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
