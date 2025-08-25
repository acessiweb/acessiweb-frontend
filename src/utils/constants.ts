export const HOMEPAGE_LINKS = [
  "/",
  "/admin",
  "/admin/diretrizes",
  "/diretrizes",
];

export const symbolMap: Record<string, string> = {
  arroba: "@",
  hashtag: "#",
  cifrão: "$",
  "por cento": "%",
  porcento: "%",
  porcentagem: "%",
  "e comercial": "&",
  asterisco: "*",
  hífen: "-",
  traço: "-",
  igual: "=",
  underline: "_",
  sublinhado: "_",
  barra: "/",
  pipe: "|",
  "dois pontos": ":",
  "ponto e vírgula": ";",
  aspas: '"',
  "aspas simples": "'",
  apóstrofe: "'",
  vírgula: ",",
  ponto: ".",
  interrogação: "?",
  exclamação: "!",
  til: "~",
  crase: "`",
  "abre parênteses": "(",
  "fecha parênteses": ")",
  "abre colchetes": "[",
  "fecha colchetes": "]",
  "abre chaves": "{",
  "fecha chaves": "}",
  "sem espaço": "",
};

export const LOCAL_STORAGE_PREFS = "acessiweb-prefs";
export const LOCAL_STORAGE_CART = "acessiweb-cart";

export const DEFAULT_CART = {
  name: "",
  description: "",
  guidelines: [],
};

export const STATUS_CODE_TRANSLATE = {
  approved: "APROVADA",
  rejected: "REJEITADA",
  pending: "PENDENTE DE ANÁLISE",
  standby: "AGUARDANDO ENVIO",
};
