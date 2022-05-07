import type { PluginOption, UserConfig } from "vite";
import FS from "fs";

interface IOptions {
  input: string | string[],
  entry: string,
  outDir?: string
}

/**
 * 扫描目录并且找出 vue组件
 * @params string dirPath 扫描的目录路径
 */
function scanComponents(dirPath: string): string[] {
  const files = FS.readdirSync(dirPath);
  const components: string[] = [];

  files.forEach(file => {
    if (FS.statSync(`${dirPath}/${file}`).isDirectory()) {
      components.push(...scanComponents(`${dirPath}/${file}`));
    } else {
      components.push(`${dirPath}/${file}`);
    }
  });

  return components;
}

export default function (rawOptions: IOptions, lib = true, open = true): PluginOption {
  const options: PluginOption = {
    name: "tianjian/vite-plugin-vue-scaffold-build",
    apply: "build"
  }
  if (open === false) return options;

  const input: string[] = ["vue"];
  const paths: Record<string, string> = { "vue": "./vue.js" };

  if (lib) {
    if (rawOptions.input) {
      if (Array.isArray(rawOptions.input)) {
        rawOptions.input.forEach(path => {
          if (FS.existsSync(path)) {
            input.push(...scanComponents(path));
          }
        })
      } else {
        if (FS.existsSync(rawOptions.input)) {
          input.push(...scanComponents(rawOptions.input));
        }
      }
    }
  }

  const config: UserConfig = {
    build: {
      cssCodeSplit: false,
      emptyOutDir: true,
      rollupOptions: {
        // input,
        external: ["vue"],
        output: {
          paths,
          dir: rawOptions.outDir ?? "dist",
          minifyInternalExports: false,
          // sourcemap: true,
          manualChunks(id) {
            if (id.includes("@vue") || id === "plugin-vue:export-helper") {
              return "vue";
            }
            if (id.includes(".vue")) {
              return id.slice(id.lastIndexOf("/") + 1, id.lastIndexOf("."));
            }
          }
        }
      },
      lib: {
        entry: rawOptions.entry,
        formats: ["es"]
      }
    }
  }
  if (!lib) {
    config.build.rollupOptions.input = input;
  }

  options['config'] = () => {
    return config;
  }

  return options;
}