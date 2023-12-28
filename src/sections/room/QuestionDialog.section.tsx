import { forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide,
  LinearProgress,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useRoom from "../../hooks/useRoom.tsx";
import { UserStatusEnum } from "../../constants/constants.tsx";
import AnswerType from "../../components/AnswerType.tsx";

const Transition = forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

const QuestionDialogSection = () => {
  const {
    room, status, timer,
    // onClickAnswer,
  } = useRoom();

  const { miliseconds, seconds, progress } = timer;
  // useEffect(() => {
  //   if (progress === 10000) {
  //     onClickAnswer(false);
  //   }
  // }, [progress, onClickAnswer]);
  return (
    <Dialog open={status.user === UserStatusEnum.ANSWERING} TransitionComponent={Transition} keepMounted={false}>
      <LinearProgress variant="determinate" value={(progress * 100) / 10000} color="secondary" />
      <DialogTitle
        sx={{
          textAlign: "center",
        }}>
        {room?.steps[room.currentStep].category.name || ""}
      </DialogTitle>
      <DialogContent>
        <>
          <DialogContentText>
            {room?.steps[room.currentStep].questions[room.steps[room.currentStep].askQuestion].question}
            {seconds}:{miliseconds}
          </DialogContentText>
          <AnswerType
            type={room?.steps[room.currentStep].questions[room.steps[room.currentStep].askQuestion].type}
          />
        </>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionDialogSection;
