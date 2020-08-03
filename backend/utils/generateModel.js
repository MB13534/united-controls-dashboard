require("dotenv").config({ path: "../.env" });
const fs = require("fs");
const { Columns } = require("../models");

const schema = process.argv[2];
const table = process.argv[3];
const directoryName = process.argv[4];
const modelName = process.argv[5];

Columns.findAll({
  where: {
    table_schema: schema,
    table_name: table,
  },
})
  .then((data) => {
    const mapped = data.map((d) => d.dataValues);
    const types = [...new Set(mapped.map((d) => d.data_type.toUpperCase()))];

    const generateFields = (fields) => {
      let obj = {};
      fields.map(
        (field) =>
          (obj[field.column_name] = {
            type: field.data_type.toUpperCase(),
          })
      );
      return obj;
    };

    const fileString = `
      module.exports = (sequelize, DataTypes) => {
        const { ${types.join(", ")} } = DataTypes;
        const ${modelName} = sequelize.define(
          ${table},
          ${JSON.stringify(generateFields(mapped))},
          {
            timestamps: false,
            schema: "${schema}",
            freezeTableName: true,
          }
        );
        return ${modelName};
      };
    `;

    fs.mkdirSync(`../models/${directoryName}`);
    fs.writeFileSync(`../models/${directoryName}/${modelName}.js`, fileString);

    console.log(fileString);
  })
  .catch((err) => {
    console.error(err);
  });
