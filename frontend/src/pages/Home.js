import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
} from "@material-ui/core";

import logo from "../images/HomePageBanner.png";
import Layout from "../components/Layout";
import GoogleChart from "../components/GoogleChart";

// create page styles
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  logo: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    "& img": {
      maxWidth: "100%",
    },
  },
  description: {
    marginTop: 0,
    marginBottom: theme.spacing(2),
    lineHeight: 1.8,
    fontSize: 18,
    textAlign: "left",
  },
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <Layout>
      <Container maxWidth="md" className={classes.container}>
        <div className={classes.logo}>
          <img src={logo} alt="Starterkit Logo" />
        </div>
        <Typography variant="h4" style={{ textAlign: "left" }} gutterBottom>
          United Water and Sanitation District Controls Dashboard
        </Typography>
        <Typography variant="h6" color="secondary">
          <em>Water Information and Data Management Tools</em>
        </Typography>
        <GoogleChart />
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="secondary">
                  Ditch Rider Tools
                </Typography>
                <Typography variant="body1">
                  Time-saving data management tools supporting day-to-day
                  operations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="secondary">
                  Shareholder Resources
                </Typography>
                <Typography variant="body1">
                  Shareholder specific reporting and lookup functions providing
                  transparency and timely communication.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="secondary">
                  Board Reports
                </Typography>
                <Typography variant="body1">
                  Live and interacive system monitoring and asset tracking
                  reports.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;
