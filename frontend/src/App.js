import React, { Suspense } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useAuth0 } from "./hooks/auth";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";
import theme from "./theme";

const Home = React.lazy(() => import("./pages/Home"));
const Alerts = React.lazy(() => import("./pages/Alerts"));
const Contacts = React.lazy(() => import("./pages/Contacts"));
const ContactGroups = React.lazy(() => import("./pages/ContactGroups"));
const ContactsToGroupsAssoc = React.lazy(() =>
  import("./pages/ContactsToGroupsAssoc")
);

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact component={Home} />

            <PrivateRoute path="/contacts" exact component={Contacts} />
            <PrivateRoute
              path="/contact-groups"
              exact
              component={ContactGroups}
            />
            <PrivateRoute
              path="/contacts-to-groups"
              exact
              component={ContactsToGroupsAssoc}
            />
            <PrivateRoute path="/alerts" exact component={Alerts} />

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
