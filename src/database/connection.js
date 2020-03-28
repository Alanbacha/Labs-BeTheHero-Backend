const knex = require("knex");
const configuration = require("../../knexfile");
const dotenv = require("dotenv");

dotenv.config();

let config;
switch (process.env.NODE_ENV) {
	case "dev":
		config = configuration.development;
		break;
	case "test":
		config = configuration.test;
		break;
	case "production":
		config = configuration.production;
		break;
}
const connection = knex(config);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

module.exports = connection;
