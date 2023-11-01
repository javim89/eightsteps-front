import { useState } from "react";
import { Button, Grid } from "@mui/material";
import CreateParticipantDialog from "../sections/home/CreateParticipantDialog.section.tsx";
import useAuth from "../hooks/useAuth.tsx";

const Home = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <CreateParticipantDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
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
          {user ? (<div>Bienvenido {user.alias}</div>) : (
            <Button variant="contained" onClick={() => setOpenDialog(true)}>Vamo a juga</Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
