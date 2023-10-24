import { object, string } from "yup";

const createParticipant = object({
  alias: string().required("Debe ingresar un alias"),
});

export default createParticipant;
