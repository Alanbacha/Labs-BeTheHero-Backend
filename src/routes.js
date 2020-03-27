// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

// Getting methods the files bellow
const sessionController = require("./controllers/sessionController");
const ongController = require("./controllers/ongController");
const incidentController = require("./controllers/incidentController");

const ongValidator = require("./validators/ongValidator");
const incidentValidator = require("./validators/incidentValidator");

// Creating a Router
const router = express.Router();

// Creating routes for Session
router.post("/session", sessionController.create);

// Creating routes for ONGs
//router.post("/ong", ongValidator.create, ongController.create);
router.post(
	"/ong",
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string()
				.required()
				.email(),
			whatsapp: Joi.string()
				.required()
				.min(10)
				.max(13),
			city: Joi.string().required(),
			uf: Joi.string()
				.required()
				.length(2)
		})
	}),
	ongController.create
);
router.get("/ong", ongController.list);
router.get("/ong/:id", celebrate({ [Segments.PARAMS]: Joi.object().keys({ id: Joi.string().required() }) }), ongController.get);
//router.put("/ong/:id", ongValidator.update, ongController.update);
router.put("/ong/:id", celebrate({ [Segments.PARAMS]: Joi.object().keys({ id: Joi.string().required() }) }), ongController.update);
//router.delete("/ong/:id", ongValidator.delete, ongController.delete);
router.delete("/ong/:id", celebrate({ [Segments.PARAMS]: Joi.object().keys({ id: Joi.string().required() }) }), ongController.delete);

// Creating routes for Incidents
//router.post("/incident", incidentValidator.create, incidentController.create);
router.post(
	"/incident",
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			title: Joi.string().required(),
			description: Joi.string().required(),
			value: Joi.number().required(),
			ong_id: Joi.string().required()
		})
	}),
	incidentController.create
);
router.get("/incident", celebrate({ [Segments.HEADERS]: Joi.object({ authorization: Joi.string() }).unknown(), [Segments.QUERY]: Joi.object().keys({ page: Joi.number() }) }), incidentController.list);
router.get("/incident/:id", celebrate({ [Segments.PARAMS]: Joi.object().keys({ id: Joi.number().required() }) }), incidentController.get);
//router.put("/incident/:id", incidentValidator.update, incidentController.update);
router.put("/incident/:id", celebrate({ [Segments.PARAMS]: Joi.object().keys({ id: Joi.number().required() }) }), incidentController.update);
//router.delete("/incident/:id", incidentValidator.delete, incidentController.delete);
router.delete("/incident/:id", celebrate({ [Segments.PARAMS]: Joi.object().keys({ id: Joi.number().required() }) }), incidentController.delete);

// Exporting the Router with the news routes
module.exports = router;
