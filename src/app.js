const express = require("express");
const app = express();
app.disable("x-powered-by");

app.get("/", (_req, res) =>  {
    res.status(200).send("Hello world")
})
module.exports = app;