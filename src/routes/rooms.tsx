import { useState, Suspense, useEffect } from "react";
import {
  Box,
  Skeleton,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import HeaderSection from "../sections/HeaderSection.tsx";
import RoomsSection from "../sections/rooms/RoomsSection.tsx";
import DialogFormSection from "../sections/rooms/DialogFormSection.tsx";
import { GET_ROOMS } from "../querys/querys.tsx";

const CREATE_ROOM = gql`
  mutation CreateRoom($name: String){
    createRoom(name: $name) {
      id 
    }
  }
`;

const Rooms = () => {
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
  const [createRoom, { data, loading }] = useMutation(CREATE_ROOM, {
    refetchQueries: [
      GET_ROOMS,
    ],
  });

  const navigate = useNavigate();

  const onSubmitRoom = async (values: FormData) => {
    await createRoom({
      variables: values,
    });
  };

  useEffect(() => {
    navigate(data?.createRoom?.id);
  }, [data, navigate]);

  return (
    <Box>
      <DialogFormSection
        open={openFormDialog}
        onClose={() => setOpenFormDialog(false)}
        onSubmit={onSubmitRoom}
        loading={loading}
      />
      <HeaderSection
        name="Salas"
        createAction={() => setOpenFormDialog(true)}
      />
      <Suspense fallback={<Skeleton />}>
        <RoomsSection />
      </Suspense>
    </Box>
  );
};

export default Rooms;
