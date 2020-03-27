//Requires
const app = require("./app");

// Setting the port where the application wil run
const port = process.env.PORT || process.env.PORT_ENV || 3333;

app.listen(port, () => {
	console.log(`Server running at localhost:` + port);
});
