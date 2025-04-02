import * as yup from "yup";

const createProjectSchema = yup.object().shape({
  name: yup.string().trim().max(150).required("Nome é obrigatório"),
  description: yup.string().trim(),
});

export type AddProject = yup.InferType<typeof createProjectSchema>;

export default createProjectSchema;
