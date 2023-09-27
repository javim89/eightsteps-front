import { object, string } from "yup";

const addParticipantToRoom = object({
  alias: string().required("Debe ingresar un alias"),
});

export default addParticipantToRoom;
