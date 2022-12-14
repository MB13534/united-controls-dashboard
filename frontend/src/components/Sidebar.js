import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import LogoutIcon from "@material-ui/icons/ExitToApp";
//import SecurityIcon from "@material-ui/icons/Security";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import ContactsIcon from "@material-ui/icons/Contacts";
import ContactGroupsIcon from "@material-ui/icons/Group";
import AssocIcon from "@material-ui/icons/GroupWork";
import AccountIcon from "@material-ui/icons/AccountCircle";
import AlertsIcon from "@material-ui/icons/Notifications";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../images/logo.png";
import { useAuth0 } from "../hooks/auth";

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  mobileToolbar: {
    backgroundColor: theme.palette.primary.main,
    color: `#ffffff`,
  },
  toolbar: {
    textAlign: "center",
    padding: theme.spacing(2, 1, 1, 1),
    color: "#ffffff",
    backgroundColor: theme.palette.primary.light,
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    overflow: `auto!important`,
    backgroundColor: theme.palette.primary.main,
    borderRight: "1px solid #ddd",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    maxHeight: 50,
  },
  nav: {
    color: `#ffffff`,
  },
  navIcon: {
    color: `#ffffff`,
  },
  navText: {
    "& span": {
      fontSize: `18px!important`,
    },
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // function for naviating to a specific page in the app
  const goTo = (route) => {
    history.push(`/${route}`);
    localStorage.setItem("last_url", history.location.pathname);
  };

  /**
   * Utility function used to determine if a menu link is active
   * @param {*} item
   */
  const setActive = (item) => {
    if (item.exact) {
      return history.location.pathname === `/${item.activePath}`;
    } else {
      return history.location.pathname.includes(item.activePath);
    }
  };

  // Configure sidebar menu items
  const MenuItems = [
    {
      link: "",
      title: "Home",
      activePath: "",
      exact: true,
      icon: HomeIcon,
      loginRequired: false,
    },
    {
      link: "alerts",
      title: "Alerts",
      activePath: "alerts",
      exact: true,
      icon: AlertsIcon,
      loginRequired: true,
    },
    {
      link: "contacts",
      title: "Contacts",
      activePath: "contacts",
      exact: true,
      icon: ContactsIcon,
      loginRequired: true,
    },
    {
      link: "contact-groups",
      title: "Contact Groups",
      activePath: "contact-groups",
      icon: ContactGroupsIcon,
      loginRequired: true,
    },
    {
      link: "contacts-to-groups",
      title: "Contact to Groups Associations",
      activePath: "contacts-to-groups",
      icon: AssocIcon,
      loginRequired: true,
    },
    {
      link: "mobile",
      title: "Mobile Reports",
      activePath: "mobile",
      icon: PhoneAndroidIcon,
      loginRequired: false,
    },
  ];

  const returnMenuItem = (item, isAuthenticated, user) => {
    const li = (
      <ListItem
        button
        onClick={() => goTo(item.link)}
        selected={setActive(item)}
        key={item.title}
      >
        <ListItemIcon className={classes.navIcon}>
          <item.icon />
        </ListItemIcon>
        <ListItemText className={classes.navText} primary={item.title} />
      </ListItem>
    );

    if (item.loginRequired && item.rolesRequired && user) {
      let roleSwitch = false;
      const roles = [...item.rolesRequired];
      roles.forEach((role) => {
        if (user["https://ccwcd2.org/roles"].includes(role)) {
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

  const drawer = (
    <div id="sidebar">
      <div className={classes.toolbar}>
        <img src={logo} className={classes.logo} alt="Logo" />
        <Typography variant="h6" gutterBottom>
          United Water and Sanitation District
        </Typography>
      </div>
      <List className={classes.nav}>
        {MenuItems.map((item) => returnMenuItem(item, isAuthenticated, user))}
        {isAuthenticated ? (
          <ListItem button>
            <ListItemIcon className={classes.navIcon}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.navText}
              primary="Logout"
              onClick={() => logout()}
            />
          </ListItem>
        ) : (
          <ListItem button>
            <ListItemIcon className={classes.navIcon}>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.navText}
              primary="Login"
              onClick={() => loginWithRedirect()}
            />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Toolbar className={classes.mobileToolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            United Water and Sanitation District
          </Typography>
        </Toolbar>
      </Hidden>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default Sidebar;
