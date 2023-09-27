import { object, string } from "yup";

const createRoomValidationSchema = object({
  name: string().required("Debe ingresar un nombre"),
});

export default createRoomValidationSchema;
