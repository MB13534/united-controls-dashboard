// Central imports
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


const ContactsManagement = () => {
  const classes = useStyles();
  const [Data, isLoading, setData] = useFetchData("contacts", []);

const Columns = [
  {
    title: "Name",
    field: "contact_name",
    //lookup: formattedRechargeStructureTypes,
    cellStyle: { minWidth: 200 }
  },
  {
    title: "Email",
    field: "contact_address",
    //lookup: formattedStructureTypes,
    cellStyle: { minWidth: 200 },
  },
  {
    title: "Organization",
    field: "contact_org",
   // lookup: formattedStructureTypes,
    cellStyle: { minWidth: 200 },
  },
  { title: "notes", 
  field: "remark" },
];

return (
  <Layout>
    <section className={classes.root}>
      <div className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
      
          <DataAdminTable
            title="Contacts Management"
            data={Data}
            columns={Columns}
            loading={isLoading}
            updateHandler={setData}
            endpoint="contacts"
            ndxField="contact_ndx"
          />
        </Container>
      </div>
    </section>
  </Layout>
);
};

export default ContactsManagement;