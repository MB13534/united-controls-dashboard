module.exports = (sequelize, DataTypes) => {
  const { TEXT, INTEGER } = DataTypes;
  const ListContactGroups = sequelize.define(
    "list_groups",
    {
      group_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_desc: {
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
  return ListContactGroups;
};
