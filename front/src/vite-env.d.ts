/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_NEXT_PUBLIC_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
