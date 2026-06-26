import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Dev-only plugin: runs the guard-rail preflight once when the dev server
 * starts and prints a one-line summary. Never blocks the dev server. The
 * full report is available via `bun preflight` and `/knowledge/preflight`.
 */
function preflightDevWarning(): Plugin {
  return {
    name: "preflight-dev-warning",
    apply: "serve",
    async configureServer() {
      try {
        const { runPreflight } = await import(
          "./src/master/knowledge/preflight"
        );
        const report = await runPreflight();
        const tag = report.ok ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m";
        const summary = `${tag} preflight: ${report.passed} pass · ${report.failed} fail · ${report.skipped} skipped`;
        const hint = report.failed
          ? `  \x1b[2m(run \`bun preflight\` for the failure list with partner-doc routes)\x1b[0m`
          : "";
        // eslint-disable-next-line no-console
        console.log(`\n${summary}${hint}\n`);
      } catch (e) {
        // Never crash dev server because of preflight.
        // eslint-disable-next-line no-console
        console.warn("preflight skipped:", e instanceof Error ? e.message : e);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "development" && preflightDevWarning(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion-vendor": ["framer-motion", "lenis"],
        },
      },
    },
  },
}));
