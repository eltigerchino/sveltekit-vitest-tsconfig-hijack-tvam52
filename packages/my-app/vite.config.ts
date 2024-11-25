import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type Plugin } from "vite";

export default defineConfig({
  plugins: [sveltekit(), cwdVsConfigRoot()],
});

/**
 * Sample Vite plugin that compares the current working directory vs the Vite
 * root config directory.
 */
function cwdVsConfigRoot(): Plugin {
  return {
    name: "cwd-vs-config-root",
    configureServer(server) {
      console.log("[cwd-vs-config-root] process.cwd:", process.cwd());
      console.log("[cwd-vs-config-root] config.root:", server.config.root);
    },
  };
}
