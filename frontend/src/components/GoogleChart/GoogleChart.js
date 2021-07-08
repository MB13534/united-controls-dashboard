import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Chart } from "react-google-charts";
import Component from "react-component-component";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    padding: "20px 0",
    backgroundColor: "white",
    marginBottom: "40px",
    height: "600px",
  },
  controls: {
    margin: "10px 0 60px 0",
    backgroundColor: "white",
    paddingBottom: "20px",
    textAlign: "center",
  },
});

class GoogleChart extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Component
          initialState={{ dataLoadingStatus: "loading", chartData: [] }}
          didMount={async function (component) {
            const response = await fetch(
              "https://unitedwaterdata.com/sites/all/scripts/pg_to_gviz_cwid_showallfalse.php?output_type=category2&data_table_name=data2021rebuild._display_999_batteries_last7days&category_index_field=date_trunc&series_index_field=station_desc&series_label_field=station_desc&series_value_field=batt&output_format=json_simple"
            );
            const json = await response.json();

            const data = json.rows;

            const columns = [
              {
                type: "datetime",
                label: "Date",
              },
            ];

            for (let i = 1; i < json.cols.length; i++) {
              columns.push({
                type: "number",
                label: json.cols[i].label,
              });
            }

            const rows = [];
            for (let row of data) {
              let tempRow = [];

              tempRow.push(new Date(Date.parse(row.c[0].v)));

              for (let i = 1; i < row.c.length; i++) {
                let value = row.c[i].v;
                if (value != null) value = value.toFixed(2);
                tempRow.push(value);
              }

              rows.push(tempRow);
            }

            console.log([columns, ...rows]);

            component.setState({
              chartData: [columns, ...rows],
              dataLoadingStatus: "ready",
            });
          }}
        >
          {(component) => {
            return component.state.dataLoadingStatus === "ready" ? (
              <Chart
                chartType="LineChart"
                width={"100%"}
                height={"550px"}
                data={component.state.chartData}
                options={{
                  focusTarget: "category",
                  title: "Last 7 Days of Hourly Minimum Battery Reports",
                  titleTextStyle: {
                    fontSize: 16,
                    color: "#000066",
                  },
                  vAxis: {
                    title: "mV",
                    titleTextStyle: { fontSize: 20, italic: false, bold: true },
                    textStyle: { fontSize: 16 },
                  },
                  hAxis: {
                    textStyle: { fontSize: 16 },
                    format: "MM/d/yy",
                  },
                  // series: {
                  //     0: { targetAxisIndex: 0, color: '#FF3D00', lineWidth: 3 },
                  //     1: { targetAxisIndex: 0, color: '#0091EA', lineWidth: 3 }
                  // },
                  legend: {
                    position: "top",
                    alignment: "center",
                    maxLines: 10,
                    textStyle: { fontSize: "1em" },
                  },
                }}
                rootProps={{ "data-testid": "1" }}
                chartPackages={["corechart", "controls"]}
                controls={[
                  {
                    controlType: "DateRangeFilter",
                    controlPosition: "bottom",
                    options: {
                      filterColumnIndex: 0,
                      matchType: "any",
                      ui: {
                        cssClass: classes.controls,
                        label: "Slide to Filter by Date",
                        selectedValuesLayout: "aside",
                        labelStacking: "horizontal",
                      },
                    },
                  },
                ]}
              />
            ) : (
              <div>Fetching data from API</div>
            );
          }}
        </Component>
      </div>
    );
  }
}

export default withStyles(useStyles)(GoogleChart);
