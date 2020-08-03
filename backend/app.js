const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const ExampleRoutes = require("./routes/Example");
const ContactsRoutes = require("./routes/Contacts");
const ContactGroupsRoutes = require("./routes/ContactGroups");
const AlertsRoutes = require("./routes/Alerts");
const AlertTypeRoutes = require("./routes/AlertTypes");
const StationsRoutes = require("./routes/Stations");
const { setHeaders } = require("./middleware");

const PORT = process.env.PORT || 3005;

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// Configure headers
app.use(setHeaders);

// Set routes
app.use("/api/example", ExampleRoutes);
app.use("/api/contacts", ContactsRoutes);
app.use("/api/contact-groups", ContactGroupsRoutes);
app.use("/api/alert-types", AlertTypeRoutes);
app.use("/api/alerts", AlertsRoutes);
app.use("/api/stations", StationsRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
