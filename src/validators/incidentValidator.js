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
 * Check attribute title
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 */
const checkAttributeTitle = req => {
	req.check("title")
		.notEmpty()
		.withMessage("Write a title")
		.isLength({ min: 4, max: 150 })
		.withMessage("the title must be between 4 to 150 characters");
};

/**
 * Check attribute description
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 */
const checkAttributeDescription = req => {
	req.check("description")
		.notEmpty()
		.withMessage("Write an description")
		.isLength({ min: 4, max: 150 })
		.withMessage("the description must be between 4 to 150 characters");
};

/**
 * Check attribute value
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 */
const checkAttributeValue = req => {
	// value
	req.check("value")
		.notEmpty()
		.withMessage("You need to inform a value of the transaction")
		.isDecimal()
		.withMessage("The value must be decimal")
		.custom(value => {
			return value > 0;
		})
		.withMessage("The value must be greater then 0");
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
 * Validation before create a new Incident
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 * @param {*} next Callback argument to the middleware function, called "next" by convention.
 */
exports.create = (req, res, next) => {
	// Check attributes
	checkAttributeTitle(req);
	checkAttributeDescription(req);
	checkAttributeValue(req);

	// Check errors
	checkForErros(req, res, next);
};

/**
 * Validation before update a Incident
 * @param {*} req HTTP request argument to the middleware function, called "req" by convention.
 * @param {*} res HTTP response argument to the middleware function, called "res" by convention.
 * @param {*} next Callback argument to the middleware function, called "next" by convention.
 */
exports.update = (req, res, next) => {
	// Check attributes
	checkAttributeId(req);
	checkAttributeTitle(req);
	checkAttributeDescription(req);
	checkAttributeValue(req);

	// Check errors
	checkForErros(req, res, next);
};

/**
 * Validation before delete a Incident
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
