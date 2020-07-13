import React, { Suspense } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useAuth0 } from "./hooks/auth";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";
import theme from "./theme";

const Home = React.lazy(() => import("./pages/Home"));
const AuthenticatedHome = React.lazy(() => import("./pages/AuthenticatedHome"));
const ContactsManagement = React.lazy(() =>
  import("./pages/ContactsManagement")
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

            {/* Private Route Example */}
            <PrivateRoute
              path="/authenticated-home"
              exact
              component={AuthenticatedHome}
            />

            <PrivateRoute
              path="/contacts"
              exact
              component={ContactsManagement}
            />

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
