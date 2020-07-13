import { createMuiTheme } from "@material-ui/core/styles";

// This allows us to wrap the entire application in our custom theme
export default createMuiTheme({
  palette: {
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#285e79",
    },
  },
  typography: {
    useNextVariants: true,
  },
});
