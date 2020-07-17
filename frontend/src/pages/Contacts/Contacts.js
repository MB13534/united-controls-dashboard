import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import Layout from "../../components/Layout";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
}));

const ContactsManagement = (props) => {
  const classes = useStyles();
  return (
    <Layout>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Contacts Management
        </Typography>
        <Typography variant="body1" className={classes.description} paragraph>
          You could put super secret content here that users can only see if
          they are logged in.
        </Typography>
      </Container>
    </Layout>
  );
};

export default ContactsManagement;
