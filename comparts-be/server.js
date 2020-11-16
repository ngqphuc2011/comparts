let express = require("express");
let bodyParser = require("body-parser")
let routes = require("./routes");
let db = require("./db");

let app = express();
let port = 3000;

// app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes(app);
app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(port, () => {
  console.log("Server started on: " + port);
});
