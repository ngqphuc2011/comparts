let express = require("express");
let bodyParser = require("body-parser");
let routes = require("./src/routes");
let path = require("path");

let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	next();
});
app.use("/public", express.static(path.join(__dirname, "public")));

routes(app);

app.get("/", (req, res) => {
	res.send("Hello");
});
app.listen(port, () => {
	console.log("Server started on: " + port);
});
