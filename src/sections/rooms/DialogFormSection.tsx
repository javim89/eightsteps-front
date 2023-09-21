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
import Form from "../../components/Form/Form.tsx";
import Input from "../../components/Form/Input.tsx";
import roomValidationSchema from "../../validation-schemas/room.tsx";

const Transition = forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

const DialogFormSection = ({
  open, onClose, onSubmit, loading,
}: {
  open: boolean,
  onClose: () => void
  onSubmit: (values: FormData) => void
  loading: boolean
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={open} onClose={onClose} fullScreen={matches} TransitionComponent={Transition}>
      <Form
        onSubmit={onSubmit}
        validationSchema={roomValidationSchema}
      >
        <DialogTitle>Crear sala</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Crea una sala para competir con otros o con tus amigos.
          </DialogContentText>
          <Input
            autoFocus
            name="name"
            label="Nombre"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton type="submit" loading={loading} variant="contained">Crear</LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default DialogFormSection;
