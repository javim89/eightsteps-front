import {
  Box,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useLayoutEffect, useState } from "react";
import BackDropSection from "./BackDrop.section.tsx";
import Step from "../../components/Step/Step.tsx";
import useRoom from "../../hooks/useRoom.tsx";
import QuestionDialogSection from "./QuestionDialog.section.tsx";
import { SAVE_AND_CHECK_ANSWER } from "../../mutations/mutations.tsx";

const RoomSection = () => {
  const { room, showUserQuestion } = useRoom();
  const { enqueueSnackbar } = useSnackbar();
  const [saveAndcheckAnswer, { loading: loadingSaveAndCheckAnswer }] = useMutation(SAVE_AND_CHECK_ANSWER);
  const [appbarHeight, setAppbarHeight] = useState<number | undefined>(0);

  useLayoutEffect(() => {
    setAppbarHeight(document?.getElementById("appBar")?.clientHeight);
  }, []);
  const onClickAnswer = (answer: boolean) => {
    saveAndcheckAnswer({
      variables: {
        answer,
        roomId: room?.id,
      },
    }).then((res) => {
      enqueueSnackbar(room?.steps[room.currentStep].question.helperText || "Agregar helper text", {
        variant: res.data.saveAndCheckAnswer ? "success" : "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          horizontal: "center",
          vertical: "top",
        },
      });
    });
  };

  return (
  <Box>
    <BackDropSection />
    <Box>
      {showUserQuestion && (
        <QuestionDialogSection
          onClickAnswer={(answer) => onClickAnswer(answer)}
          loading={loadingSaveAndCheckAnswer}
        />
      )}
      <Box sx={[{
        display: "flex",
        flexDirection: "column",
        height: `calc(100dvh - ${appbarHeight}px)`,
      },
      ]}>
        {room?.steps.map((step: Step, index) => (
          <Step
          key={index}
            {...step}
          />
        ))}
      </Box>
    </Box>
  </Box>
  );
};

export default RoomSection;
