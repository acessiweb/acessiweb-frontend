export const PASSWORD_MASK =
  /^(?=.*[A-Z])(?=.*[@#*\^&!%])(?=.*\d.*\d)[A-Za-z\d@#*\^&!%]{8,16}$/;
export const MOBILE_PHONE_MASK = /^(\+?55)?\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
export const PASSWORD_VALIDATION_MSG =
  "A senha precisa ter no mínimo 8 caracteres e no máximo 16 caracteres. Pelo menos uma letra maiúscula. Pelo menos um símbolo dentre os quais: @, #, *, ^, &, !, %. E pelo menos 2 caracteres numéricos";
export const USERNAME_MASK = /^[A-Za-z0-9]+( [A-Za-z0-9]+)*$/;
