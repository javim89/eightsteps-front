import { Grid } from "@mui/material";
import { useSuspenseQuery } from "@apollo/client";
import RoomCard from "../../components/Room/RoomCard.tsx";
import { GET_ROOMS } from "../../querys/querys.tsx";

const RoomsSection = ({ openAddParticipantDialog }: {
  openAddParticipantDialog: (roomId: string) => void;
}) => {
  const { data, error } = useSuspenseQuery(GET_ROOMS);

  if (error) return <p>Error : {error.message}</p>;

  return (
    <Grid container spacing={2} mt={2}>
      {data.getAllRooms.map((room: Room) => (
        <Grid item key={room.id}>
          <RoomCard
            name={room.name}
            participants={room.participants}
            onClickJoin={() => openAddParticipantDialog(room.id)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomsSection;
