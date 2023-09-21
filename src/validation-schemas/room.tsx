import { object, number } from "yup";

const roomValidationSchema = object({
  name: number().required("Debe ingresar un nombre"),
});

export default roomValidationSchema;
