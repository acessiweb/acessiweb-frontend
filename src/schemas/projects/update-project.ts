import * as yup from "yup";

const guidelinesSchema = yup.object().shape({
  id: yup.string().required(), //mudar para uuid
  name: yup.string().trim().max(150).required(),
});

const updateProjectSchema = yup.object().shape({
  name: yup.string().trim().max(150).optional(),
  description: yup.string().trim().optional(),
  guidelines: yup
    .array()
    .of(guidelinesSchema)
    .min(1, "Você ainda não incluiu diretrizes no seu projeto"),
  // userId: yup.string().trim().required(),
});

export default updateProjectSchema;
