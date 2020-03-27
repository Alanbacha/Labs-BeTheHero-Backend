/**
 * Check attribute id
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 */
const checkAttributeId = req => {
	req.check("id")
		.notEmpty()
		.withMessage("id is required");
};

/**
 * Check attribute name
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 */
const checkAttributeName = req => {
	req.check("name")
		.notEmpty()
		.withMessage("Write a name")
		.isLength({ min: 4, max: 150 })
		.withMessage("the name must be between 4 to 150 characters");
};

/**
 * Check attribute email
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 */
const checkAttributeEmail = req => {
	req.check("email")
		.notEmpty()
		.withMessage("Write an email")
		.isLength({ min: 4, max: 150 })
		.withMessage("the email must be between 4 to 150 characters");
};

/**
 * Check attribute whatsapp
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 */
const checkAttributeWhatsApp = req => {
	req.check("whatsapp")
		.notEmpty()
		.withMessage("Write a whatsapp")
		.isLength({ min: 4, max: 150 })
		.withMessage("the whatsapp must be between 4 to 150 characters");
};

/**
 * Check attribute city
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 */
const checkAttributeCity = req => {
	req.check("city")
		.notEmpty()
		.withMessage("Write a city")
		.isLength({ min: 4, max: 150 })
		.withMessage("the city must be between 4 to 150 characters");
};

/**
 * Check attribute uf
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 */
const checkAttributeUF = req => {
	req.check("uf")
		.notEmpty()
		.withMessage("Write a UF")
		.isLength({ min: 2, max: 2 })
		.withMessage("the uf must have 2 characters");
};

/**
 * Check for errors
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 * @param {*} next Callback argument to the middleware function, called "next" by convention.
 */
const checkForErros = (req, res, next) => {
	req.asyncValidationErrors()
		.then(result => {
			// Proceed to next middleware
			next();
		})
		.catch(errors => {
			console.log("b");
			// if error show the first one as they happen
			if (errors) {
				const firstError = errors.map(error => error.msg)[0];
				console.log("c");
				return res.status(400).json({ success: false, error: firstError });
			}
		});
};

/**
 * Validation before create a new ONG
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 * @param {*} next Callback argument to the middleware function, called "next" by convention.
 */
exports.create = (req, res, next) => {};

/**
 * Validation before update a ONG
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 * @param {*} next Callback argument to the middleware function, called "next" by convention.
 */
exports.update = (req, res, next) => {
	// Check attributes
	checkAttributeId(req);
	checkAttributeName(req);
	checkAttributeEmail(req);
	checkAttributeWhatsApp(req);
	checkAttributeCity(req);
	checkAttributeUF(req);

	// Check errors
	checkForErros(req, res, next);
};

/**
 * Validation before delete a ONG
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 * @param {*} next Callback argument to the middleware function, called "next" by convention.
 */
exports.delete = (req, res, next) => {
	// Check attributes
	checkAttributeId(req);

	// Check errors
	checkForErros(req, res, next);
};
