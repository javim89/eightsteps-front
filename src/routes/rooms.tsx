import { useState, Suspense } from "react";
import {
  Box,
  Skeleton,
} from "@mui/material";
import HeaderSection from "../sections/HeaderSection.tsx";
import RoomsSection from "../sections/rooms/RoomsSection.tsx";
import DialogFormSection from "../sections/rooms/DialogFormSection.tsx";

const Rooms = () => {
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);

  const onSubmitRoom = (values: FormData) => {
    console.log({ values });
  };

  return (
    <Box>
      <DialogFormSection
        open={openFormDialog}
        onClose={() => setOpenFormDialog(false)}
        onSubmit={onSubmitRoom}
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
