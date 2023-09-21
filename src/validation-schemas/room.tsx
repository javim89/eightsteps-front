import { object, string } from "yup";

const roomValidationSchema = object({
  name: string().required("Debe ingresar un nombre"),
});

export default roomValidationSchema;
