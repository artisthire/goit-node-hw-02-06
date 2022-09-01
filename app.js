const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const staticDir = path.resolve("./public");
const uploadDir = path.resolve("./public/avatars");
console.log(path.basename(uploadDir));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(staticDir));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const status = err.status || 500;
  res
    .status(status)
    .json(err.messageDetails ? err.messageDetails : { message: err.message });
});

module.exports = app;
