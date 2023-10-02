import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box, Backdrop, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { GET_ROOM_BY_ID } from "../querys/querys.tsx";
import Step from "../components/Step/Step.tsx";
import ROOM_SUBSCRIPTION from "../subscriptions/subscriptions.tsx";

const Room = () => {
  const { id } = useParams();
  const [appbarHeight, setAppbarHeight] = useState<number | undefined>(0);
  const {
    subscribeToMore, loading, error, data,
  } = useQuery(GET_ROOM_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    setAppbarHeight(document?.getElementById("appBar")?.clientHeight);

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
    <Box>
      <Backdrop
        sx={{ color: "#ffffff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={data ? data.getRoomById.participants < 8 : true}
      >
        <Box sx={{
          textAlign: "center",
        }}>
        <Typography paddingBottom={5} fontSize={32}>Esperando participantes</Typography>
        <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
      <Box sx={[{
        display: "flex",
        flexDirection: "column",
        height: `calc(100dvh - ${appbarHeight}px)`,
      },
      ]}>
        {data?.getRoomById.steps.map((step: Step, index) => (
          <Step
            key={index}
            {...step}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Room;
