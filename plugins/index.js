"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
/**
 * 扫描目录并且找出 vue组件
 * @params string dirPath 扫描的目录路径
 */
function scanComponents(dirPath) {
    var files = fs_1["default"].readdirSync(dirPath);
    var components = [];
    files.forEach(function (file) {
        if (fs_1["default"].statSync("".concat(dirPath, "/").concat(file)).isDirectory()) {
            components.push.apply(components, scanComponents("".concat(dirPath, "/").concat(file)));
        }
        else {
            components.push("".concat(dirPath, "/").concat(file));
        }
    });
    return components;
}
function default_1(rawOptions, lib, open) {
    var _a;
    if (lib === void 0) { lib = true; }
    if (open === void 0) { open = true; }
    var options = {
        name: "tianjian/vite-plugin-vue-scaffold-build",
        apply: "build"
    };
    if (open === false)
        return options;
    var input = ["vue"];
    var paths = { "vue": "./vue.js" };
    if (lib) {
        if (rawOptions.input) {
            if (Array.isArray(rawOptions.input)) {
                rawOptions.input.forEach(function (path) {
                    if (fs_1["default"].existsSync(path)) {
                        input.push.apply(input, scanComponents(path));
                    }
                });
            }
            else {
                if (fs_1["default"].existsSync(rawOptions.input)) {
                    input.push.apply(input, scanComponents(rawOptions.input));
                }
            }
        }
    }
    var config = {
        build: {
            cssCodeSplit: false,
            emptyOutDir: true,
            rollupOptions: {
                // input,
                external: ["vue"],
                output: {
                    paths: paths,
                    dir: (_a = rawOptions.outDir) !== null && _a !== void 0 ? _a : "dist",
                    minifyInternalExports: false,
                    // sourcemap: true,
                    manualChunks: function (id) {
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
    };
    if (!lib) {
        config.build.rollupOptions.input = input;
    }
    options['config'] = function () {
        return config;
    };
    return options;
}
exports["default"] = default_1;
