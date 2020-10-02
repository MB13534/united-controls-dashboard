module.exports = (sequelize, DataTypes) => {
  const { INTEGER } = DataTypes;
  const DeleteGroups = sequelize.define(
    "delete_groups",
    {
      group_ndx: {
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
  return DeleteGroups;
};
