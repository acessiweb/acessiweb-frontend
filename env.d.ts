/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IMAGE_KIT_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
