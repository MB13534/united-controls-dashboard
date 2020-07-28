import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container} from "@material-ui/core";
import Layout from "../../components/Layout";
import DataAdminTable from "../../components/DataAdminTable";
import useFetchData from "../../hooks/useFetchData";



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


const ContactGroupsManagement = (props) => {
  const classes = useStyles();
  const [Data, isLoading, setData] = useFetchData("contact-groups", []);

const Columns = [
  {
    title: "Contact Group Index",
    field: "group_ndx",
    cellStyle: { minWidth: 250 },
  },
  {
    title: "Group Description",
    field: "group_desc",
    cellStyle: { minWidth: 200 }
  },
  { 
    title: "notes", 
    field: "remark" },
];

return (
  <Layout>
    <section className={classes.root}>
      <div className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
      
          <DataAdminTable
            title="Contact Groups Management"
            data={Data}
            columns={Columns}
            loading={isLoading}
            updateHandler={setData}
            endpoint="contact-groups"
            ndxField="group_ndx"
          />
        </Container>
      </div>
    </section>
  </Layout>
);
};

export default ContactGroupsManagement;