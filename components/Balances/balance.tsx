import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useBalances } from "../../lib/services/balances";
import Grid from "@mui/material/Grid";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import emitter from "../../lib/utils/eventEmitter";

export default function Balance({ account }) {
  const { address, balance, isLoading, isError } = useBalances(account);
  function disconnect() {
    emitter.emit("disconnect");
  }

  function truncate(text: string) {
      const firstPart = text.slice(0, 10);
      const secondPart = text.slice(-10);

      return `${firstPart}...${secondPart}`;
  }

  if (isLoading)
    return <div className="flex h-screen justify-center">Loading...</div>; // Make it a spinner
  if (isError) return <div>An error happened</div>; // make an error component

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Card sx={{ minWidth: 275, mb: 4, p: 4 }} variant="outlined">
        <CardContent sx={{ minHeight: 200 }}>
          <Typography sx={{ mb: 4 }} variant="h6" component="div">
            {truncate(address)}
          </Typography>
          <Typography sx={{ mb: 4 }} variant="h5" component="div">
            Balances
          </Typography>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <Typography variant="h6" component="div">
                {balance.result[0].name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" component="div">
                {balance.result[0].balance}&nbsp;
                {balance.result[0].symbol}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ borderRadius: 0 }}
            onClick={disconnect}
            endIcon={<PowerOffIcon />}
          >
            Disconnect
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
