import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery, gql, TypedDocumentNode } from "@apollo/client";
import RoomCard from "../../components/Room/RoomCard.tsx";

interface Data {
  getAllRooms: Room[];
}

const GET_ROOMS: TypedDocumentNode<Data> = gql`
  query GetAllRooms {
    getAllRooms {
      id
    }
  }
`;

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
            participants={room.participants?.length}
            onClickJoin={() => navigate(room.id)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomsSection;
