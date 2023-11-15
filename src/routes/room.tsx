import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ROOM_BY_ID } from "../querys/querys.tsx";
import ROOM_SUBSCRIPTION from "../subscriptions/subscriptions.tsx";
import RoomProvider from "../contexts/room.context.tsx";
import RoomSection from "../sections/room/Room.section.tsx";

const Room = () => {
  const { id } = useParams();

  const {
    subscribeToMore, loading, error, data,
  } = useQuery(GET_ROOM_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: ROOM_SUBSCRIPTION, // Tu suscripción GraphQL
      variables: { id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        // Realiza las actualizaciones necesarias en los datos de la habitación
        return {
          ...prev,
          ...subscriptionData.data.roomSubscription,
        };
      },
    });

    return () => unsubscribe();
  }, [id, subscribeToMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <RoomProvider room={data?.getRoomById}>
      <RoomSection />
    </RoomProvider>
  );
};

export default Room;
