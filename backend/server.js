const express = require('express');
const cors = require('cors');
import portfolio from "./api/portfolio.route.js"
const bodyParser = require('body-parser');

const app = express();

// middleware to receive form data
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

app.use(cors());
app.use(express.json());

app.use("/api/v1/portfolio", portfolio);
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app;