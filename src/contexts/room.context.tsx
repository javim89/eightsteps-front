import { createContext } from "react";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import useAuth from "../hooks/useAuth.tsx";
import { UserStatusEnum, RoomStatusEnum } from "../constants/constants.tsx";
import { SAVE_AND_CHECK_ANSWER } from "../mutations/mutations.tsx";

interface UserAndRoomStatusI {
  user: UserStatusEnum;
  room: RoomStatusEnum;
}
interface RoomContextI {
  status: UserAndRoomStatusI;
  showUserQuestion: boolean;
  room: Room | undefined;
  onClickAnswer: (answer: boolean | number) => void;
  loading: boolean;
}

export const RoomContext = createContext<RoomContextI>({
  status: {
    user: UserStatusEnum.WAITING,
    room: RoomStatusEnum.WAITING_USERS,
  },
  showUserQuestion: false,
  room: undefined,
  onClickAnswer: () => {},
  loading: false,
});

const RoomProvider = ({ room, children }: { room: Room | undefined; children: JSX.Element | JSX.Element[] }) => {
  const { user } = useAuth();
  const [saveAndcheckAnswer, { loading }] = useMutation(SAVE_AND_CHECK_ANSWER);
  const { enqueueSnackbar } = useSnackbar();

  const currentStep = room?.steps[room.currentStep];

  const userOnRoom = currentStep?.participants.find((cs) => cs.user?.alias === user?.alias);

  const userStatus = userOnRoom?.status || UserStatusEnum.WAITING;
  const roomStatus = room?.status || RoomStatusEnum.WAITING_USERS;
  const showUserQuestion = userOnRoom?.showQuestion || false;

  const onClickAnswer = (answer: boolean | number) => {
    saveAndcheckAnswer({
      variables: {
        answer,
        roomId: room?.id,
      },
    }).then((res) => {
      enqueueSnackbar(room?.steps[room.currentStep].questions[room.steps[room.currentStep].askQuestion].helperText || "Agregar helper text", {
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
    <RoomContext.Provider value={{
      status: {
        user: userStatus,
        room: roomStatus,
      },
      showUserQuestion,
      room,
      onClickAnswer,
      loading,
    }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
