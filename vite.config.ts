import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import build from "./src";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), build({
    // input: "src/components",
    withVue: false,
    // buildComponents: true
    buildProject: true
  })]
});
