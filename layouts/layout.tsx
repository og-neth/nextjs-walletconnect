import Head from "next/head";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="lg">
      <Head>
        <title>MintGoldDust NextJS Exercise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="primary" position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              WalletConnect 2.0 Demo
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <Box component="main" sx={{ mt: 12 }}>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
