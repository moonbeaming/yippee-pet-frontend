const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const router = require('./routes/router')

app.use('/', router)

app.get("/api", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
