module.exports = (sequelize, DataTypes) => {
  const { INTEGER } = DataTypes;
  const AssocContactGroups = sequelize.define(
    "assoc_contacts_groups",
    {
      assoc_c2g_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_ndx: { type: INTEGER },
      contact_ndx: { type: INTEGER },
    },
    {
      timestamps: false,
      schema: "contacts",
      freezeTableName: true,
    }
  );
  return AssocContactGroups;
};
