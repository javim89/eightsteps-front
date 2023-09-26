import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@apollo/client";
import RoomCard from "../../components/Room/RoomCard.tsx";
import { GET_ROOMS } from "../../querys/querys.tsx";

const RoomsSection = () => {
  const navigate = useNavigate();
  const { data, error } = useSuspenseQuery(GET_ROOMS);

  if (error) return <p>Error : {error.message}</p>;

  return (
    <Grid container spacing={2} mt={2}>
      {data.getAllRooms.map((room: Room) => (
        <Grid item key={room.id}>
          <RoomCard
            name={room.name}
            participants={room.participants}
            onClickJoin={() => navigate(room.id)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomsSection;
