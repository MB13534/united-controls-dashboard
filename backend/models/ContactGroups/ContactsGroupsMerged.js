module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ContactsGroupsMerged = sequelize.define(
    "view_contacts_groups_merged_dropdown",
    {
      ctype: {
        type: INTEGER,
      },
      merged_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      contact_ndx: {
        type: INTEGER,
      },
      contact_info: {
        type: TEXT,
      },
      addresses: {
        type: TEXT,
      },
      group_with_addresses: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "contacts",
      freezeTableName: true,
    }
  );
  return ContactsGroupsMerged;
};
