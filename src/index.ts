import type { PluginOption, UserConfig } from "vite";
import FS from "fs";
import log from "./log";

log.clear();

interface IOptions {
  input?: string | string[],
  buildComponents?: boolean,
  buildProject?: boolean
}

const VuePath: string = "/assets/vue.js";

/**
 * 扫描目录并且找出 vue组件
 * @params string dirPath 扫描的目录路径
 * @returns Record<string,string> 找出的vue组件文件，以及文件路径
 */
function scanComponents(dirPath: string): Record<string, string> {
  const files = FS.readdirSync(dirPath);
  const components: Record<string, string> = {};

  files.forEach(file => {
    if (FS.statSync(`${dirPath}/${file}`).isDirectory()) {
      Object.assign(components, scanComponents(`${dirPath}/${file}`));
    } else {
      if (file.endsWith(".vue")) {
        const fileName: string = file.slice(0, file.lastIndexOf("."));
        components[fileName] = `${process.cwd()}/${dirPath}/${file}`;
      }
    }
  });

  return components;
}

export default function (rawOptions: IOptions, open = true): PluginOption {
  const options: PluginOption = {
    name: "tianjian/vite-plugin-vue-scaffold-build",
    apply: "build"
  }
  const input: Record<string, string> = {};
  const paths: Record<string, string> = { "vue": VuePath };

  if (!rawOptions.buildProject && open && rawOptions.buildComponents) {
    if (rawOptions.input) {
      if (Array.isArray(rawOptions.input)) {
        rawOptions.input.forEach(path => {
          if (FS.existsSync(path)) {
            Object.assign(input, scanComponents(path));
          }
        })
      } else {
        if (FS.existsSync(rawOptions.input)) {
          Object.assign(input, scanComponents(rawOptions.input));
        }
      }
    }
  }
  let assetFileNames: string = "assets/[ext]/[name]-[hash].[extname]";
  if (rawOptions.buildComponents) {
    assetFileNames = "[ext]/[name]-[hash].[extname]";

    input['vue'] = "vue";
  } else {
    input['assets/vue'] = "vue";
  }

  const config: UserConfig = {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          minifyInternalExports: false,
          assetFileNames,
          // chunkFileNames(chunkInfo) {
          //   console.log(chunkInfo);
          //   return `vue.js`;
          // },
          // manualChunks(id) {
          //   if (/vue@[\d\.]+/.test(id)) {
          //     return "vue";
          //   }
          //   return "11111";
          // }
        }
      }
    }
  }
  if (open) {
    // @ts-ignore
    config.build.rollupOptions.output.paths = paths;
    config.build.rollupOptions.external = ["vue"];

    if (!rawOptions.buildProject) {
      config.build.rollupOptions.input = input;
      if (rawOptions.buildComponents) {
        config.build.lib = {
          entry: "",
          formats: ["es"],
          fileName: (format) => {
            return "[name].js";
          }
        };
      }
    }

    options['config'] = () => {
      return config;
    }

    return options;
  }
}