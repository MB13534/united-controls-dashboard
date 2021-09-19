// Central imports
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Layout from "../../components/Layout";
import DataAdminTable from "../../components/DataAdminTable";
import useFetchData from "../../hooks/useFetchData";
import useFormatLookup from "../../hooks/useFormatLookup";

// Central style
const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  topNav: {
    marginBottom: theme.spacing(2),
  },
}));

const AlertsManagement = (props) => {
  const classes = useStyles();
  const [Data, isLoading, setData] = useFetchData("alerts", []);
  const [Stations] = useFetchData("stations", []);
  const [AlertTypes] = useFetchData("alert-types", []);
  const [Contacts] = useFetchData("contact-groups/merged", []);
  const formattedStations = useFormatLookup(
    Stations,
    "station_ndx",
    "station_desc"
  );
  const formattedAlertTypes = useFormatLookup(
    AlertTypes,
    "alert_type_ndx",
    "alert_type_desc"
  );
  const formattedContacts = useFormatLookup(
    Contacts,
    "merged_ndx",
    "group_with_addresses"
  );

  const Columns = [
    {
      title: "Enabled",
      field: "enabled",
      type: "boolean",
    },
    {
      title: "Measurement Station",
      field: "station_ndx",
      lookup: formattedStations,
    },
    {
      title: "Alert Type",
      field: "alert_type_ndx",
      lookup: formattedAlertTypes,
    },
    {
      title: "Alert Value",
      field: "alert_value",
    },
    {
      title: "Reset Interval Hours",
      field: "reset_interval_hours",
    },
    {
      title: "Last Alert Sent",
      field: "last_alert_sent",
      type: "datetime",
      editable: "never",
    },
    {
      title: "Distribution List",
      field: "alert_address_ndx",
      lookup: formattedContacts,
    },
    { title: "notes", field: "remark" },
  ];

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <DataAdminTable
              title="Alerts Management"
              data={Data}
              columns={Columns}
              loading={isLoading}
              updateHandler={setData}
              endpoint="alerts"
              ndxField="alert_request_ndx"
            />
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default AlertsManagement;
