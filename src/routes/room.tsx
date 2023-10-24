import { useEffect, useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Box, Backdrop, Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { GET_ROOM_BY_ID } from "../querys/querys.tsx";
import Step from "../components/Step/Step.tsx";
import ROOM_SUBSCRIPTION from "../subscriptions/subscriptions.tsx";
import QuestionDialogSection from "../sections/room/QuestionDialogSection.tsx";

const Room = () => {
  const { id } = useParams();
  const [appbarHeight, setAppbarHeight] = useState<number | undefined>(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | undefined>(undefined);

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

  useLayoutEffect(() => {
    setAppbarHeight(document?.getElementById("appBar")?.clientHeight);
  }, []);

  useEffect(() => {
    setOpenDialog(data?.getRoomById.showQuestion || false);
    setCurrentStep(data?.getRoomById.currentStep);
  }, [data?.getRoomById]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const checkAnswer = (questionId: string, answer: boolean) => {
    console.log({ questionId });
    console.log({ answer });
  };

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
      {(currentStep && openDialog) && (
      <QuestionDialogSection
        open={openDialog}
        checkAnswer={(questionId, answer) => checkAnswer(questionId, answer)}
        category={data?.getRoomById.steps[currentStep - 1].category.name || ""}
        question={data?.getRoomById.steps[currentStep - 1].question}
      />
      )}
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
