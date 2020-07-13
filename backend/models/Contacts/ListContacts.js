module.exports = (sequelize, DataTypes) => {
  const { TEXT, INTEGER } = DataTypes;
  const ListContacts = sequelize.define(
    "list_contacts",
    {
      contact_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      contact_address: {
        type: TEXT,
      },
      contact_name: {
        type: TEXT,
      },
      contact_org: {
        type: TEXT,
      },
      remark: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "contacts",
      freezeTableName: true,
    }
  );
  return ListContacts;
};
