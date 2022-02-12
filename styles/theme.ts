import { createTheme } from "@mui/material/styles";
import { red, grey, yellow } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    // mode: "dark",
    background: {
      paper: yellow[300],
    },
    primary: {
      main: grey[900],
    },
    secondary: {
      main: yellow[300],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
