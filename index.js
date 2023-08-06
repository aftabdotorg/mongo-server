import express from "express";

const app = express();
const PORT = 5007;

app.get("/", (req, res) => {
  res.send("Working!!");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
