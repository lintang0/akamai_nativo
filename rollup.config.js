import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy-assets";
import json from "rollup-plugin-json";
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/main.ts",

  /* Define external modules, which will be provided by the EdgeWorker platform */
  external: ["text-encode-transform", "create-response", "http-request"],

  output: {
    dir: "dist/work",
    format: "es",
  },
  preserveModules: false,
  plugins: [
    // Handle TypeScript
    typescript(),
    // Convert CommonJS modules to ES6
    commonjs(),
    // Resolve global node variables
    globals(),
    // Resolve global node build ins
    builtins(),
    // Resolves modules from node_modules
    resolve(),
    /* Copy bundle.json to the output directory */
    copy({
      assets: ["bundle.json"],
    }),
    // Minimize!
    terser({
      mangle: false,
      output: {
        comments: false
      },
      compress: false
    }),
    /* Package json data as an ES6 module */
    json()
  ],
};
