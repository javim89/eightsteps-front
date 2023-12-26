import { Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { QuestionsTypeEnum } from "../constants/constants.tsx";
import useRoom from "../hooks/useRoom.tsx";

interface AnswerTypeI {
  type: Question["type"] | undefined
}

const BooleanAnswer = () => {
  const { onClickAnswer, loading } = useRoom();
  return (
    <Stack gap={2} mt={2}>
      <LoadingButton variant="contained" onClick={() => onClickAnswer(true)} loading={loading}>Verdadero</LoadingButton>
      <LoadingButton variant="contained" onClick={() => onClickAnswer(false)} loading={loading}>Falso</LoadingButton>
    </Stack>
  );
};

const NumericAnswer = () => {
  const { onClickAnswer } = useRoom();
  return (
    <Stack gap={2} mt={2}>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" type="number" onKeyDown={(e) => {
        const target = e.target as HTMLButtonElement;
        if (e && e.key === "Enter") {
          onClickAnswer(Number(target.value));
        }
      }}/>
    </Stack>
  );
};

const AnswerType: React.FC<AnswerTypeI> = ({ type }): JSX.Element => {
  switch (type) {
    case QuestionsTypeEnum.BOOLEAN: return <BooleanAnswer />;
    case QuestionsTypeEnum.NUMERIC: return <NumericAnswer />;
    default: return <BooleanAnswer />;
  }
};

export default AnswerType;
