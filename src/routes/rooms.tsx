import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Grid,
  Box,
  Skeleton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Slide,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import RoomCard from "../components/Room/RoomCard.tsx";
import HeaderSection from "../sections/HeaderSection.tsx";

const GET_ROOMS = gql`
  query GetAllRooms {
    getAllRooms {
      id
    }
  }
`;

const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

const DialogForm = ({ open, onClose }: {
  open: boolean,
  onClose: () => void
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog open={open} onClose={onClose} fullScreen={matches} TransitionComponent={Transition}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};
const Rooms = () => {
  const { loading, error, data } = useQuery(GET_ROOMS);
  const navigate = useNavigate();
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);

  if (error) return <p>Error : {error.message}</p>;
  return (
    <Box>
      <DialogForm open={openFormDialog} onClose={() => setOpenFormDialog(false)} />
      <HeaderSection
        name="Salas"
        createAction={() => setOpenFormDialog(true)}
      />
      {
        loading ? (
          <Skeleton />
        ) : (
          <Grid container spacing={2} mt={2}>
            {data.getAllRooms.map((room: Room) => (
              <Grid item key={room.id}>
                <RoomCard
                  name={room.name}
                  participants={room.participants?.length}
                  onClickJoin={() => navigate(room.id)} />
              </Grid>
            ))}
          </Grid>
        )
      }
    </Box>
  );
};

export default Rooms;
