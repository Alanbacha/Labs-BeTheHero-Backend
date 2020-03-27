const connection = require("../database/connection");

/**
 * A method to Create Session
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 */
exports.create = async (req, res) => {
	const { id } = req.body;

	const ong = await connection("ong")
		.where("id", id)
		.select("name")
		.first();

	if (!ong) {
		return res.status(400).json({ success: false, error: "No ONG found with this ID" });
	}
	return res.json(ong);
};
