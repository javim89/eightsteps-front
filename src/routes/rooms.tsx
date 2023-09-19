import { useQuery, gql } from "@apollo/client";

const GET_ROOMS = gql`
  query GetAllRooms {
    getAllRooms {
      id
    }
  }
`;

const Rooms = () => {
  const { loading, error, data } = useQuery(GET_ROOMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      {data.getAllRooms.map((room: Room) => room.id)}
    </div>
  );
};

export default Rooms;
