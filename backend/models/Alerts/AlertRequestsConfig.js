module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, REAL, DATE, BOOLEAN } = DataTypes;
  const AlertRequestsConfig = sequelize.define(
    "alert_requests_config",
    {
      alert_request_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      station_ndx: {
        type: INTEGER,
      },
      alert_type_ndx: {
        type: INTEGER,
      },
      alert_value: {
        type: REAL,
      },
      alert_address_ndx: {
        type: INTEGER,
      },
      reset_interval_hours: {
        type: REAL,
      },
      last_alert_sent: {
        type: DATE,
      },
      enabled: {
        type: BOOLEAN,
      },
      remark: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "alert",
      freezeTableName: true,
    }
  );
  return AlertRequestsConfig;
};
