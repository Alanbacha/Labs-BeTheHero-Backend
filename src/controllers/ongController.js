// Getting schema "Ong" from the file bellow
//const ONG = require("./models/ong");

const generateUniqueId = require("../utils/generateUniqueId");

const connection = require("../database/connection");

/**
 * A method to Create ONG
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 */
exports.create = async (req, res) => {
	const { name, email, whatsapp, city, uf } = req.body;
	const id = generateUniqueId();

	await connection("ong").insert({ id, name, email, whatsapp, city, uf });

	return res.json({ id });
};

/**
 * A method to List ONGs
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 */
exports.list = async (req, res) => {
	const ongs = await connection("ong").select("*");

	return res.json(ongs);
};

/**
 * A method to Get a especifique ONG
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 */
exports.get = async (req, res) => {};

/**
 * A method to Update ONG
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 */
exports.update = async (req, res) => {};

/**
 * A method to Delete ONG
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 */
exports.delete = async (req, res) => {};
