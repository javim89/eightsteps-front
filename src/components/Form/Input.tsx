import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { get } from "lodash";

type InputI = {
  name: string;
} & TextFieldProps;

const Input: React.FC<InputI> = ({ name, ...rest }) => {
  const methods = useFormContext();
  const { register, formState: { errors } } = methods;

  const errorMesage = get(errors, `${name}.message`);
  return (
    <TextField
    variant="outlined"
    error={!!errorMesage}
    helperText={!!errorMesage}
    {...register(name)}
    {...rest} />
  );
};

export default Input;
