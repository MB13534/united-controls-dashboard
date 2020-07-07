import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";

// This allows us to wrap the entire application in our custom theme
export default createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
  typography: {
    useNextVariants: true,
  },
});
