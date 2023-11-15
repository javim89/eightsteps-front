import { createContext } from "react";
import useAuth from "../hooks/useAuth.tsx";
import { UserStatusEnum, RoomStatusEnum } from "../constants/constants.tsx";

interface UserAndRoomStatusI {
  user: UserStatusEnum;
  room: RoomStatusEnum;
}
interface RoomContextI {
  status: UserAndRoomStatusI;
  showUserQuestion: boolean;
  room: Room | undefined;
}

export const RoomContext = createContext<RoomContextI>({
  status: {
    user: UserStatusEnum.WAITING,
    room: RoomStatusEnum.WAITING_USERS,
  },
  showUserQuestion: false,
  room: undefined,
});

const RoomProvider = ({ room, children }: { room: Room | undefined; children: JSX.Element | JSX.Element[] }) => {
  const { user } = useAuth();

  const currentStep = room?.steps[room.currentStep];

  const userOnRoom = currentStep?.participants.find((cs) => cs.user?.alias === user?.alias);

  const userStatus = userOnRoom?.status || UserStatusEnum.WAITING;
  const roomStatus = room?.status || RoomStatusEnum.WAITING_USERS;
  const showUserQuestion = userOnRoom?.showQuestion || false;

  return (
    <RoomContext.Provider value={{
      status: {
        user: userStatus,
        room: roomStatus,
      },
      showUserQuestion,
      room,
    }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
