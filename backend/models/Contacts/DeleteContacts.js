module.exports = (sequelize, DataTypes) => {
  const { INTEGER } = DataTypes;
  const DeleteContacts = sequelize.define(
    "delete_contacts",
    {
      contact_ndx: {
        type: INTEGER,
        primaryKey: true,
      }
    },
    {
      timestamps: false,
      schema: "contacts",
      freezeTableName: true,
    }
  );
  return DeleteContacts;
};
