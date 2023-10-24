import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateParticipantDialog from "../sections/home/CreateParticipantDialog.section.tsx";
import useAuth from "../hooks/useAuth.tsx";

const Home = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("rooms");
    }
  }, [user, navigate]);

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
        <Button variant="contained" onClick={() => setOpenDialog(true)}>Vamo a juga</Button>
      </Grid>
    </Grid>
  </>
  );
};

export default Home;
