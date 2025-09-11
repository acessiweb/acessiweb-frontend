import { z } from "zod";

const guideName = z
  .string()
  .trim()
  .max(150, "O nome deve ter no máximo 150 caracteres")
  .refine((val) => val.length > 0, {
    message: "É necessário informar um nome",
  });

const desc = z
  .string()
  .trim()
  .refine((val) => val.length > 0, {
    message: "É necessário informar uma descrição",
  });

const guideImage = z
  .any()
  .optional()
  .refine(
    (files) => files === null || files.length === 0 || files[0].size <= 5000000,
    "O tamanho máximo permitido para imagem é de 5MB"
  )
  .refine(
    (files) =>
      files === null ||
      files.length === 0 ||
      ["image/jpeg", "image/png"].includes(files[0].type),
    "Apenas imagem permitido"
  );

const imageDesc = z
  .string()
  .trim()
  .max(250, "A descrição da imagem deve ter no máximo 250 caracteres")
  .optional();

const deficiences = z.array(z.string().trim()).refine((val) => val.length > 0, {
  message: "A diretriz precisa ter ao menos uma deficiência relacionada",
});

export const createEditGuidelineSchema = z
  .object({
    guideName,
    desc,
    guideImage,
    imageDesc,
    deficiences,
  })
  .superRefine((data, ctx) => {
    if (data.guideImage?.[0]?.size && !data.imageDesc?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Ao informar uma imagem, é necessário informar a descrição dela",
        path: ["imageDesc"],
      });
    }
  });

export type CreateEditGuidelineSchema = z.infer<
  typeof createEditGuidelineSchema
>;
