module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, BOOLEAN } = DataTypes;
  const ListStations = sequelize.define(
    "list_measurement_stations",
    {
      station_ndx: { type: INTEGER, primaryKey: true, autoIncrement: true },
      station_desc: { type: TEXT },
      meas_category: { type: TEXT },
      measure_type_ndx: { type: INTEGER },
      unit_ndx: { type: INTEGER },
      station_abrev: { type: TEXT },
      remark: { type: TEXT },
      hide: { type: BOOLEAN },
      metadata_import_string: { type: TEXT },
      station_statewide_ndx: { type: INTEGER },
      source_ndx: { type: INTEGER },
      incoming_station_ndx: { type: INTEGER },
      incoming_measure_type_ndx: { type: INTEGER },
      export_to_div1: { type: BOOLEAN },
      display_order: { type: INTEGER },
      process_type_ndx: { type: INTEGER },
      short_abrev: { type: TEXT },
      param_join_ndx: { type: INTEGER },
      amci: { type: BOOLEAN },
      public: { type: BOOLEAN },
      export_dinatale: { type: BOOLEAN },
      export_desanti: { type: BOOLEAN },
      export_tupond: { type: BOOLEAN },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ListStations;
};
