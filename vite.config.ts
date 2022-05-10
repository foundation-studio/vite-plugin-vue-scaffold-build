import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import build from "./plugins";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), build({
    input: "src/target",
    buildComponents: true,
    buildProject: false
  })]
});
