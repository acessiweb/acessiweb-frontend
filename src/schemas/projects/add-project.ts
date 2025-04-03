import * as yup from "yup";

const guidelinesSchema = yup.object().shape({
  id: yup.string().required(), //mudar para uuid
  name: yup.string().trim().max(150).required(),
});

const createProjectSchema = yup.object().shape({
  name: yup.string().trim().max(150).required("Nome é obrigatório"),
  description: yup.string().trim(),
  guidelines: yup
    .array()
    .of(guidelinesSchema)
    .min(1, "Você ainda não incluiu diretrizes no seu projeto"),
});

export type AddProject = yup.InferType<typeof createProjectSchema>;

export default createProjectSchema;
