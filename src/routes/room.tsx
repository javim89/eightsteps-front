import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_ROOM_BY_ID = gql`
  query GetRoomById($id: ID) {
    getRoomById(id: $id) {
      id
      isPrivate
    }
  }
`;

const Room = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ROOM_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>{data.getRoomById.id}</div>
  );
};

export default Room;
