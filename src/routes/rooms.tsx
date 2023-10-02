import {
  Suspense, useEffect, useReducer, useState,
} from "react";
import {
  Box,
  Skeleton,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import HeaderSection from "../sections/HeaderSection.tsx";
import RoomsSection from "../sections/rooms/RoomsSection.tsx";
import DialogSection from "../sections/rooms/DialogSection.tsx";
import { GET_ROOMS } from "../querys/querys.tsx";
import { CREATE_ROOM, ADD_PARTICIPANT_TO_ROOM } from "../mutations/mutations.tsx";
import roomValidationSchema from "../validation-schemas/createRoom.tsx";
import addParticipantToRoomSchema from "../validation-schemas/addParticipantToRoom.tsx";

import Input from "../components/Form/Input.tsx";

enum ActionsRoomsEnum {
  INIT_CREATE_ROOM = "INIT_CREATE_ROOM",
  INIT_ADD_PARTICIPANT_TO_ROOM = "INIT_ADD_PARTICIPANT_TO_ROOM",
  CLOSE_DIALOG = "CLOSE_DIALOG",
}

interface ActionsRooms {
  type: ActionsRoomsEnum;
  payload?: any;
}

const initialState: RoomsStateI = {
  openDialog: false,
  title: undefined,
  contentText: undefined,
  validationSchema: undefined,
  onSubmit: undefined,
  bodyForm: undefined,
  loadingButtonText: undefined,
};

const Rooms = () => {
  const navigate = useNavigate();
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [createRoom, { data, loading: loadingCreateRoom }] = useMutation(CREATE_ROOM, {
    refetchQueries: [
      GET_ROOMS,
    ],
  });

  // eslint-disable-next-line max-len
  const [addParticipantToRoom, { loading: loadingParticipantOnRoom }] = useMutation(ADD_PARTICIPANT_TO_ROOM, {
    refetchQueries: [
      GET_ROOMS,
    ],
  });

  const onSubmitRoom = async (values: FormData) => {
    await createRoom({
      variables: values,
    });
  };

  const onCreateParticipant = async (values: FormData) => {
    await addParticipantToRoom({
      variables: {
        roomId: selectedRoomId,
        ...values,
      },
    });
    navigate(selectedRoomId);
  };

  const reducer = (state: RoomsStateI, action: ActionsRooms) => {
    switch (action.type) {
      case ActionsRoomsEnum.INIT_CREATE_ROOM:
        return {
          ...state,
          openDialog: true,
          title: "Crear sala",
          contentText: "Crea una sala para competir con otros o con tus amigos.",
          validationSchema: roomValidationSchema,
          onSubmit: onSubmitRoom,
          bodyForm: (<Input
            autoFocus
            name="name"
            label="Nombre"
            fullWidth
          />),
          loadingButtonText: "Crear sala",
        };
      case ActionsRoomsEnum.INIT_ADD_PARTICIPANT_TO_ROOM:
        return {
          ...state,
          openDialog: true,
          title: "Unirse sala",
          contentText: "Unite a la sala para competir con otros o con tus amigos.",
          validationSchema: addParticipantToRoomSchema,
          onSubmit: onCreateParticipant,
          bodyForm: (<Input
              autoFocus
              name="alias"
              label="Alias"
              fullWidth
            />),
          loadingButtonText: "Unirme a sala",
        };
      case ActionsRoomsEnum.CLOSE_DIALOG:
        return initialState;
      default:
        return initialState;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    navigate(data?.createRoom?.id);
  }, [data, navigate]);

  const openAddParticipantDialog = (roomId: string) => {
    setSelectedRoomId(roomId);
    dispatch({ type: ActionsRoomsEnum.INIT_ADD_PARTICIPANT_TO_ROOM });
  };

  return (
    <Box sx={{
      mt: 2,
    }}>
      <DialogSection
        open={state.openDialog}
        onClose={() => dispatch({ type: ActionsRoomsEnum.CLOSE_DIALOG })}
        state={state}
        loading={loadingCreateRoom || loadingParticipantOnRoom}
      />
      <HeaderSection
        name="Salas"
        createAction={() => dispatch({ type: ActionsRoomsEnum.INIT_CREATE_ROOM })}
      />
      <Suspense fallback={<Skeleton />}>
        <RoomsSection openAddParticipantDialog={openAddParticipantDialog}/>
      </Suspense>
    </Box>
  );
};

export default Rooms;
