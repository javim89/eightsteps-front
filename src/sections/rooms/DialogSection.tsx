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

const Transition = forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

const DialogSection = ({
  open, onClose, state, loading,
}: {
  open: boolean,
  onClose: () => void
  state: RoomsStateI
  loading: boolean
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={open} onClose={onClose} fullScreen={matches} TransitionComponent={Transition}>
      <Form
        onSubmit={state.onSubmit}
        validationSchema={state.validationSchema}
      >
        <DialogTitle>{state.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {state.contentText}
          </DialogContentText>
          {state.bodyForm}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton type="submit" loading={loading} variant="contained">{state.loadingButtonText}</LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default DialogSection;
