/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EIGHT_STEPS_BACKEND_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
