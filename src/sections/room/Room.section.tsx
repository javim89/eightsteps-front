import {
  Box,
} from "@mui/material";
import { useLayoutEffect, useState } from "react";
import BackDropSection from "./BackDrop.section.tsx";
import Step from "../../components/Step/Step.tsx";
import useRoom from "../../hooks/useRoom.tsx";
import QuestionDialogSection from "./QuestionDialog.section.tsx";

const RoomSection = () => {
  const { room, showUserQuestion } = useRoom();
  const [appbarHeight, setAppbarHeight] = useState<number | undefined>(0);

  useLayoutEffect(() => {
    setAppbarHeight(document?.getElementById("appBar")?.clientHeight);
  }, []);

  return (
  <Box>
    <BackDropSection />
    <Box>
      {showUserQuestion && (
        <QuestionDialogSection />
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
