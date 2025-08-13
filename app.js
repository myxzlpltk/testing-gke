const express = require("express");
const app = express();
const port = 3000;
const { Client } = require("pg");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ip", async (req, res) => {
  const response = await fetch("https://ifconfig.me");
  const ip = await response.text();
  res.send(`Your IP address is: ${ip}`);
});

app.get("/db", async (req, res) => {
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  const startTime = Date.now();

  try {
    await client.connect();
    const result = await client.query("SELECT NOW() AS current_time");
    res.send(`Current time from database: ${result.rows[0].current_time}`);
  } catch (error) {
    const elapsedTime = Date.now() - startTime;
    console.error("Database connection error:", error);
    res
      .status(500)
      .send(
        `Elapsed time: ${elapsedTime}ms\nDatabase connection error: ${error}`
      );
  } finally {
    await client.end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
