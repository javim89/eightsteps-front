import { forwardRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide,
  Stack,
  LinearProgress,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import LoadingButton from "@mui/lab/LoadingButton";

const Transition = forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

const QuestionDialogSection = ({
  open,
  onClickAnswer,
  category,
  question,
  loading,
}: {
  open: boolean,
  onClickAnswer: (answer: boolean) => void,
  category: string,
  question: Question | undefined
  loading: boolean
}) => {
  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [miliseconds, setMiliseconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress + 10);
      if (seconds === 0 && miliseconds === 0) {
        clearInterval(interval);
      } else if (miliseconds === 0) {
        setSeconds(seconds - 1);
        setMiliseconds(99);
      } else {
        setMiliseconds(miliseconds - 1);
      }
    }, 10);

    if (progress === 10000) {
      // elegir una respuesta.
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds, miliseconds, progress]);

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted={false}>
      <LinearProgress variant="determinate" value={(progress * 100) / 10000} color="secondary" />
      <DialogTitle
        sx={{
          textAlign: "center",
        }}>
        {category}
      </DialogTitle>
      <DialogContent>
        {question && (
          <>
            <DialogContentText>
              {question.question}
              {seconds}:{miliseconds}
            </DialogContentText>
            <Stack gap={2} mt={2}>
              <LoadingButton variant="contained" onClick={() => onClickAnswer(true)} loading={loading}>Verdadero</LoadingButton>
              <LoadingButton variant="contained" onClick={() => onClickAnswer(false)} loading={loading}>Falso</LoadingButton>
            </Stack>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuestionDialogSection;
