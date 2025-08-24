/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_PYTHON_API_BASE_URL: string;
  readonly VITE_API_LOGIN_PATH: string;
  readonly VITE_API_SIGNUP_PATH: string;
  readonly VITE_EMBEDDING_PATH: string;
  readonly VITE_COMPARE_PATH: string;

  readonly VITE_SERVICE_ID: string;
  readonly VITE_TEMPLATE_ID: string;
  readonly VITE_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
