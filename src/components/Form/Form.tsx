import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormI {
  children: string | JSX.Element | JSX.Element[]
  onSubmit: any;
  validationSchema?: any;
  defaultValues?: any;
  ref?: any;
}
const Form: React.FC<FormI> = ({
  validationSchema,
  onSubmit,
  defaultValues,
  children,
}) => {
  const methods = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
