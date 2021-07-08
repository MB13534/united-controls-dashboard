import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Chart } from "react-google-charts";
import Component from "react-component-component";

const useStyles = (theme) => ({
  root: {
    padding: "20px 0",
    backgroundColor: "white",
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

class GoogleTable extends React.Component {
  render() {
    const { classes, url, labels } = this.props;
    return (
      <div className={classes.root}>
        <Component
          initialState={{ dataLoadingStatus: "loading", chartData: [] }}
          didMount={async function (component) {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            //start to build the data for the graph
            //create data equal to the rows in the received json to iterate through
            const data = json.rows;

            //start to build out the columns
            const columns = [];
            //add the X axis labels that were passed in as props to the columns
            //use a loop to make sure it is dynamic and reuseable
            labels.forEach((label) => columns.push({ label }));

            //start to build out the rows
            const rows = [];
            //iterate through each line
            for (let row of data) {
              let tempRow = [];
              //iterate through each value of each line
              for (let i = 0; i < row.c.length; i++) {
                let value = row.c[i].v;
                //checks if the value is a link, if it is, it adds the drupal site starting url so it is a clickable and active link
                if (typeof value === "string" && value.includes("<a href=")) {
                  value =
                    value.substring(0, 9) +
                    url.substring(0, url.indexOf(".com") + 5) +
                    value.substring(9, value.length);
                }
                tempRow.push(value);
              }

              rows.push(tempRow);
            }

            //sets state to an array built from the labels and the data
            component.setState({
              chartData: [columns, ...rows],
              dataLoadingStatus: "ready",
            });
          }}
        >
          {(component) => {
            return (
              <Chart
                width={"100%"}
                chartType="Table"
                data={component.state.chartData}
                rootProps={{ "data-testid": "1" }}
                chartPackages={["corechart", "controls"]}
                loader={<div>Loading Chart</div>}
                options={{
                  allowHtml: true,
                  showRowNumber: true,
                  width: "100%",
                  height: "100%",
                }}
              />
            );
          }}
        </Component>
      </div>
    );
  }
}

export default withStyles(useStyles)(GoogleTable);
