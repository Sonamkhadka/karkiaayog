const express = require("express");
const path = require("path");

const app = express();
const host = "0.0.0.0";
const port = Number(process.env.PORT) || 3001;
const rootDir = __dirname;

app.use(express.static(rootDir));
app.get("/{*splat}", (req, res) => res.sendFile(path.join(rootDir, "index.html")));

app.listen(port, host, () => {
  console.log(`listening on http://localhost:${port}`);
});
