import { forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import LoadingButton from "@mui/lab/LoadingButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form.tsx";
import Input from "../../components/Form/Input.tsx";
import { CREATE_USER } from "../../mutations/mutations.tsx";
import createParticipantSchema from "../../validation-schemas/createParticipant.tsx";
import useAuth from "../../hooks/useAuth.tsx";

const Transition = forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

const CreateParticipantDialog = ({
  open, onClose,
}: {
  open: boolean,
  onClose: () => void
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { saveUser } = useAuth();
  const [createUser, { loading: loadingCreateUser }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const onSubmit = async (values: FormData) => {
    const response = await createUser({
      variables: values,
    });
    saveUser(response.data.createUser.token);
    navigate("rooms");
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={matches} TransitionComponent={Transition}>
      <Form
        onSubmit={onSubmit}
        validationSchema={createParticipantSchema}
      >
        <DialogTitle>Ingresa un alias para identificarte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            { }
          </DialogContentText>
          <Input
            autoFocus
            name="alias"
            label="Alias"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton type="submit" loading={loadingCreateUser} variant="contained">Crear usuario</LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default CreateParticipantDialog;
