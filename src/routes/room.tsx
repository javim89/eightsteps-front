import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ROOM_BY_ID } from "../querys/querys.tsx";

const Room = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ROOM_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>{data.getRoomById.name}</div>
  );
};

export default Room;
