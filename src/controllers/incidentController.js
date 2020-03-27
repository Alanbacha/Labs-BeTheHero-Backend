// Getting schema "Incident" from the file bellow
//const Incident = require("./models/incident");

const crypto = require("crypto");

const connection = require("../database/connection");

/**
 * A method to Create Incident
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 */
exports.create = async (req, res) => {
	const { title, description, value } = req.body;
	const ong_id = req.headers.authorization;

	const [id] = await connection("incident").insert({ title, description, value, ong_id });

	return res.json({ id });
};

/**
 * A method to List Incidents
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 */
exports.list = async (req, res) => {
	const incidentsPerPage = process.env.incidentsPerPage || 4;
	const { page = 1 } = req.query;

	const ong_id = req.headers.authorization || "";
	const whereClause = ong_id ? { ong_id: ong_id } : {};

	const [count] = await connection("incident")
		.where(whereClause)
		.count();

	const incidents = await connection("incident AS i")
		.join("ong AS o", "o.id", "=", "i.ong_id")
		.where(whereClause)
		.limit(incidentsPerPage)
		.offset((page - 1) * incidentsPerPage)
		.select(["i.*", "o.name", "o.email", "o.whatsapp", "o.city", "o.uf"]);

	res.header("X-Total-Count", count["count(*)"]);

	return res.json(incidents);
};

/**
 * A method to Get a especifique Incident
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 */
exports.get = async (req, res) => {};

/**
 * A method to Update Incident
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 */
exports.update = async (req, res) => {};

/**
 * A method to Delete Incident
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 */
exports.delete = async (req, res) => {
	const { id } = req.params;
	const ong_id = req.headers.authorization;

	const incident = await connection("incident")
		.where("id", id)
		.select("ong_id")
		.first();

	if (incident.ong_id != ong_id) {
		return res.status(401).json({ success: false, error: "Operation not permitted." });
	}

	await connection("incident")
		.where("id", id)
		.delete();

	return res.status(204).send();
};
