import { forwardRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide,
  Stack,
  Button,
  LinearProgress,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

const QuestionDialogSection = ({
  open,
  checkAnswer,
  category,
  question,
}: {
  open: boolean,
  checkAnswer: (id: string, answer: boolean) => void,
  category: string,
  question: Question | undefined
}) => {
  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [miliseconds, setMiliseconds] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     // Incrementa el progreso en 1 cada 100ms hasta llegar al 100%
  //     if (progress < 100) {
  //       setProgress(progress + 1);
  //     } else {
  //       clearInterval(timer);
  //     }
  //   }, 50);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [progress]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0 && miliseconds === 0) {
        clearInterval(interval);
      } else if (miliseconds === 0) {
        setSeconds(seconds - 1);
        setMiliseconds(99);
        setProgress(progress + 0.2);
      } else {
        setMiliseconds(miliseconds - 1);
        setProgress(progress + 0.2);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [seconds, miliseconds, progress]);

  return (
  <Dialog open={open} TransitionComponent={Transition} keepMounted={false}>
    <LinearProgress variant="determinate" value={progress} color="secondary"/>
    <DialogTitle sx={{
      textAlign: "center",
    }}>{category}</DialogTitle>
    <DialogContent>
      {question && (
        <>
        <DialogContentText>
          {question.question}
        </DialogContentText>
        <Stack gap={2} mt={2}>
          <Button variant="contained" onClick={() => checkAnswer(question.id, true)}>Verdadero</Button>
          <Button variant="contained" onClick={() => checkAnswer(question.id, false)}>Falso</Button>
        </Stack>
        </>
      )}
    </DialogContent>
  </Dialog>
  );
};

export default QuestionDialogSection;
