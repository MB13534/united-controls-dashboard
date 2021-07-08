// Central imports
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Layout from "../../components/Layout";
import Accordion from "../../components/Accordion";
import GoogleTable from "../../components/GoogleTable";

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

const Mobile = (props) => {
  const classes = useStyles();

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Box m={2}>
            <Accordion
              // defaultExpanded
              title="Storage Overview Report"
              content={
                <GoogleTable
                  //url for script to grab data
                  url={
                    "https://unitedwaterdata.com/sites/all/scripts/pg_to_gviz_cwid.php?output_type=SSSSS&data_table_name=data2021rebuild._overview_004_storage_values&series_fields=location_desc,available_flows_cfs,pct_full,inflow_cfs,outflow_cfs&output_format=json_simple"
                  }
                  //labels for X axis (DB will be obscuire)
                  labels={[
                    "Storage Site",
                    "Available Flow",
                    "Pct Full",
                    "Inflow",
                    "Outflow",
                  ]}
                />
              }
            />
            <Accordion
              title="Recharge Overview Report"
              content={
                <GoogleTable
                  url={
                    "https://unitedwaterdata.com/sites/all/scripts/pg_to_gviz_cwid.php?output_type=SSS&data_table_name=data2021rebuild._overview_010_recharge_values_sorted&series_fields=location_desc,wetwell_level,pct_full,inflow_cfs,outflow_cfs&output_format=json_simple"
                  }
                  labels={[
                    "Recharge Site",
                    "Wet Well Level",
                    "Pct Full",
                    "Inflow",
                    "Outflow",
                  ]}
                />
              }
            />
            <Accordion
              title="Aug Flows Overview Report"
              content={
                <GoogleTable
                  url={
                    "https://unitedwaterdata.com/sites/all/scripts/pg_to_gviz_cwid.php?output_type=SSS&data_table_name=data2021rebuild._overview_013_augflow_withytd_sorted&series_fields=location_desc,most_recent_flow,ytd_flow_af&output_format=json_simple"
                  }
                  labels={[
                    "Augmentation Site",
                    "Current Flow",
                    "YTD Flow (4/1 to now)",
                  ]}
                />
              }
            />
            <Accordion
              title="Last Reports (Oldest by Facility)"
              content={
                <GoogleTable
                  url={
                    "https://unitedwaterdata.com/sites/all/scripts/pg_to_gviz_cwid.php?output_type=SS&data_table_name=data2021rebuild._overview_014_last_reports_all&series_fields=location_desc,min_last_report&output_format=json_simple"
                  }
                  labels={["Location", "Oldest Timestamp at Facility"]}
                />
              }
            />
            <Accordion
              title="*Avail Flow Calculation Formulas"
              content={
                <GoogleTable
                  url={
                    "https://unitedwaterdata.com/sites/all/scripts/pg_to_gviz_cwid.php?output_type=SS&data_table_name=data2021rebuild._overview_002_storage_formula_table&series_fields=location_desc,formula&output_format=json_simple"
                  }
                  labels={["Storage Site", "Flow Calc Formula"]}
                />
              }
            />
            <Accordion
              title="*Avail Flow Calculation Notes"
              content={
                <GoogleTable
                  url={
                    "https://unitedwaterdata.com/sites/all/scripts/pg_to_gviz_cwid.php?output_type=SS&data_table_name=data2021rebuild._overview_005_storage_notes&series_fields=location_desc,notes&output_format=json_simple"
                  }
                  labels={["Storage Site", "Flow Calc Notes"]}
                />
              }
            />
          </Box>
        </div>
      </section>
    </Layout>
  );
};

export default Mobile;
