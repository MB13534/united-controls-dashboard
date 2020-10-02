"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
// const config    = require(__dirname + '/config.json')[env];
const db = {};

const config = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: "postgres",
  logging: false,
};

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USERNAME,
  process.env.PG_PASSWORD,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

db.sequelize = sequelize;

db.ExampleView = require("./Example")(sequelize, Sequelize);
db.ListContacts = require("./Contacts/ListContacts")(sequelize, Sequelize);
db.DeleteContacts = require("./Contacts/DeleteContacts")(sequelize, Sequelize);
db.AssocContactsGroups = require("./Contacts/AssocContactsGroups")(
  sequelize,
  Sequelize
);
db.ListContactGroups = require("./ContactGroups/ListContactGroups")(
  sequelize,
  Sequelize
);
db.DeleteGroups = require("./ContactGroups/DeleteGroups")(sequelize, Sequelize);
db.ContactsGroupsMerged = require("./ContactGroups/ContactsGroupsMerged")(
  sequelize,
  Sequelize
);
db.AlertRequestsConfig = require("./Alerts/AlertRequestsConfig")(
  sequelize,
  Sequelize
);
db.ListAlertTypes = require("./AlertTypes/ListAlertTypes")(
  sequelize,
  Sequelize
);
db.ListStations = require("./Stations/ListStations")(sequelize, Sequelize);
db.pgTables = require("./pgTables/pgTables")(sequelize, Sequelize);
db.Columns = require("./Columns/Columns")(sequelize, Sequelize);

Sequelize.postgres.DECIMAL.parse = function (value) {
  return parseFloat(value);
};
Sequelize.postgres.BIGINT.parse = function (value) {
  return parseInt(value);
};

module.exports = db;
