import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { checkActive } from "../utils";
import { useAuth0 } from "../hooks/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: `relative`,
    zIndex: 1000,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  activeLink: {
    color: `#ffffff`,
    backgroundColor: `rgba(0,0,0,0.2)`,
    fontSize: 17,
    margin: theme.spacing(0.5),
    padding: theme.spacing(1, 2),
    borderRadius: 4,
    textDecoration: `none`,
    "&:hover": {
      backgroundColor: `rgba(0,0,0,0.2)`,
      textDecoration: `none`,
    },
  },
  link: {
    color: `#ffffff`,
    fontSize: 17,
    margin: theme.spacing(0.5),
    padding: theme.spacing(1, 2),
    borderRadius: 4,
    textDecoration: `none`,
    "&:hover": {
      backgroundColor: `rgba(255,255,255,0.2)`,
      textDecoration: `none`,
    },
  },
}));

const TopNav = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  /**
   * Assign appropriate class name to menu item based
   * on if menu item is active or not
   * @param {*} url
   */
  const handleActive = (url) => {
    const active = checkActive(history, url);
    if (active) {
      return classes.activeLink;
    }
    return classes.link;
  };

  // Configure sidebar menu items
  const MenuItems = [
    {
      link: "",
      title: "Home",
      activePath: "",
      exact: true,
      loginRequired: false,
    },
    {
      link: "authenticated-home",
      title: "Authenticated Home",
      activePath: "authenticated-home",
      loginRequired: true,
    },
  ];

  const returnMenuItem = (item, isAuthenticated, user) => {
    const li = (
      <Link
        component={RouterLink}
        to={item.link}
        className={handleActive(item.activePath)}
      >
        {item.title}
      </Link>
    );

    if (item.loginRequired && item.rolesRequired && user) {
      let roleSwitch = false;
      const roles = [...item.rolesRequired];
      roles.forEach((role) => {
        if (user["https://lre-starter-kit-basic.org/roles"].includes(role)) {
          roleSwitch = true;
        }
      });
      if (isAuthenticated && roleSwitch) {
        return li;
      }
    } else if (item.loginRequired) {
      if (isAuthenticated) {
        return li;
      }
    } else {
      return li;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}></Typography>
          {MenuItems.map((item) => returnMenuItem(item, isAuthenticated, user))}
          {isAuthenticated ? (
            <Link className={handleActive("/logout")} onClick={() => logout()}>
              Logout
            </Link>
          ) : (
            <Link
              className={handleActive("/login")}
              onClick={() => loginWithRedirect()}
            >
              Login
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopNav;
