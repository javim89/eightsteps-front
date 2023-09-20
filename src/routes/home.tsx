import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => (
  <Grid
    container
    justifyContent="center"
    alignItems="center"
    direction="column"
    sx={{
      height: "59vh",
    }}
  >
    <Grid item>
      <Link to="rooms">
        <Button variant="contained">asd</Button>
      </Link>
    </Grid>
  </Grid>
);

export default Home;
