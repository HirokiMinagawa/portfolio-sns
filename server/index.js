const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const config = require("./config");
const setup = require("./setup");

const app = express();

app.use(bodyParser.json());

setup(app);

app.listen(config.port, () =>
  console.info(`server started on port ${config.port}`)
);

app.use((req, res, next) => {
  res.status(404).json({ message: "ページが見つかりません。" });
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "エラーが起こりました。" });
});
