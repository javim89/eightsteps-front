import { useContext } from "react";
import { RoomContext } from "../contexts/room.context.tsx";

const useRoom = () => {
  const context = useContext(RoomContext);

  if (context === undefined) {
    throw new Error("useRoom must be used within a RoomProvider");
  }

  return context;
};

export default useRoom;
