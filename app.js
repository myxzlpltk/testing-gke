const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ip", async (req, res) => {
  const response = await fetch("https://ifconfig.me");
  const ip = await response.text();
  res.send(`Your IP address is: ${ip}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
