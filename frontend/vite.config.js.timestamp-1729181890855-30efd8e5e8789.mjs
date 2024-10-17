// vite.config.js
import { defineConfig } from "file:///C:/Users/mit.virani/Documents/Project%20jay%20Branch/anything-llm/frontend/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "url";

// postcss.config.js
import tailwind from "file:///C:/Users/mit.virani/Documents/Project%20jay%20Branch/anything-llm/frontend/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Users/mit.virani/Documents/Project%20jay%20Branch/anything-llm/frontend/node_modules/autoprefixer/lib/autoprefixer.js";

// tailwind.config.js
var tailwind_config_default = {
  darkMode: "false",
  content: {
    relative: true,
    files: [
      "./src/components/**/*.{js,jsx}",
      "./src/hooks/**/*.js",
      "./src/models/**/*.js",
      "./src/pages/**/*.{js,jsx}",
      "./src/utils/**/*.js",
      "./src/*.jsx",
      "./index.html",
      "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}"
    ]
  },
  theme: {
    extend: {
      rotate: {
        "270": "270deg",
        "360": "360deg"
      },
      colors: {
        "black-900": "#141414",
        accent: "#3D4147",
        "sidebar-button": "#31353A",
        sidebar: "#25272C",
        "historical-msg-system": "rgba(255, 255, 255, 0.05);",
        "historical-msg-user": "#2C2F35",
        outline: "#4E5153",
        "primary-button": "#46C8FF",
        secondary: "#2C2F36",
        "dark-input": "#18181B",
        "mobile-onboarding": "#2C2F35",
        "dark-highlight": "#1C1E21",
        "dark-text": "#222628",
        description: "#D2D5DB",
        "x-button": "#9CA3AF",
        royalblue: "#065986",
        purple: "#4A1FB8",
        magenta: "#9E165F",
        danger: "#F04438",
        error: "#B42318",
        warn: "#854708",
        success: "#05603A",
        darker: "#F4F4F4"
      },
      backgroundImage: {
        "preference-gradient": "linear-gradient(180deg, #5A5C63 0%, rgba(90, 92, 99, 0.28) 100%);",
        "chat-msg-user-gradient": "linear-gradient(180deg, #3D4147 0%, #2C2F35 100%);",
        "selected-preference-gradient": "linear-gradient(180deg, #313236 0%, rgba(63.40, 64.90, 70.13, 0) 100%);",
        "main-gradient": "linear-gradient(180deg, #3D4147 0%, #2C2F35 100%)",
        "modal-gradient": "linear-gradient(180deg, #3D4147 0%, #2C2F35 100%)",
        "sidebar-gradient": "linear-gradient(90deg, #5B616A 0%, #3F434B 100%)",
        "login-gradient": "linear-gradient(180deg, #3D4147 0%, #2C2F35 100%)",
        "menu-item-gradient": "linear-gradient(90deg, #3D4147 0%, #2C2F35 100%)",
        "menu-item-selected-gradient": "linear-gradient(90deg, #5B616A 0%, #3F434B 100%)",
        "workspace-item-gradient": "linear-gradient(90deg, #3D4147 0%, #2C2F35 100%)",
        "workspace-item-selected-gradient": "linear-gradient(90deg, #5B616A 0%, #3F434B 100%)",
        "switch-selected": "linear-gradient(146deg, #5B616A 0%, #3F434B 100%)"
      },
      fontFamily: {
        sans: [
          "plus-jakarta-sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
      },
      animation: {
        sweep: "sweep 0.5s ease-in-out",
        "pulse-glow": "pulse-glow 1.5s infinite"
      },
      keyframes: {
        sweep: {
          "0%": { transform: "scaleX(0)", transformOrigin: "bottom left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "bottom left" }
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 }
        },
        "pulse-glow": {
          "0%": {
            opacity: 1,
            transform: "scale(1)",
            boxShadow: "0 0 0 rgba(255, 255, 255, 0.0)",
            backgroundColor: "rgba(255, 255, 255, 0.0)"
          },
          "50%": {
            opacity: 1,
            transform: "scale(1.1)",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
            boxShadow: "0 0 0 rgba(255, 255, 255, 0.0)",
            backgroundColor: "rgba(255, 255, 255, 0.0)"
          }
        }
      }
    }
  },
  // Required for rechart styles to show since they can be rendered dynamically and will be tree-shaken if not safe-listed.
  safelist: [
    {
      pattern: /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"]
    },
    {
      pattern: /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"]
    },
    {
      pattern: /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"]
    },
    {
      pattern: /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern: /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern: /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    }
  ],
  plugins: []
};

// postcss.config.js
var postcss_config_default = {
  plugins: [tailwind(tailwind_config_default), autoprefixer]
};

// vite.config.js
import react from "file:///C:/Users/mit.virani/Documents/Project%20jay%20Branch/anything-llm/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dns from "dns";
import { visualizer } from "file:///C:/Users/mit.virani/Documents/Project%20jay%20Branch/anything-llm/frontend/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/mit.virani/Documents/Project%20jay%20Branch/anything-llm/frontend/vite.config.js";
dns.setDefaultResultOrder("verbatim");
var vite_config_default = defineConfig({
  assetsInclude: [
    "./public/piper/ort-wasm-simd-threaded.wasm",
    "./public/piper/piper_phonemize.wasm",
    "./public/piper/piper_phonemize.data"
  ],
  worker: {
    format: "es"
  },
  server: {
    port: 3e3,
    host: "localhost"
  },
  define: {
    "process.env": process.env
  },
  css: {
    postcss: postcss_config_default
  },
  plugins: [
    react(),
    visualizer({
      template: "treemap",
      // or sunburst
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: "bundleinspector.html"
      // will be saved in project's root
    })
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      },
      {
        process: "process/browser",
        stream: "stream-browserify",
        zlib: "browserify-zlib",
        util: "util",
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        }
      }
    ]
  },
  build: {
    rollupOptions: {
      output: {
        // These settings ensure the primary JS and CSS file references are always index.{js,css}
        // so we can SSR the index.html as text response from server/index.js without breaking references each build.
        entryFileNames: "index.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "index.css")
            return `index.css`;
          return assetInfo.name;
        }
      },
      external: [
        // Reduces transformation time by 50% and we don't even use this variant, so we can ignore.
        /@phosphor-icons\/react\/dist\/ssr/
      ]
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ["@mintplex-labs/piper-tts-web"],
    esbuildOptions: {
      define: {
        global: "globalThis"
      },
      plugins: []
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicG9zdGNzcy5jb25maWcuanMiLCAidGFpbHdpbmQuY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbWl0LnZpcmFuaVxcXFxEb2N1bWVudHNcXFxcUHJvamVjdCBqYXkgQnJhbmNoXFxcXGFueXRoaW5nLWxsbVxcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbWl0LnZpcmFuaVxcXFxEb2N1bWVudHNcXFxcUHJvamVjdCBqYXkgQnJhbmNoXFxcXGFueXRoaW5nLWxsbVxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbWl0LnZpcmFuaS9Eb2N1bWVudHMvUHJvamVjdCUyMGpheSUyMEJyYW5jaC9hbnl0aGluZy1sbG0vZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tIFwidXJsXCJcbmltcG9ydCBwb3N0Y3NzIGZyb20gXCIuL3Bvc3Rjc3MuY29uZmlnLmpzXCJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIlxuaW1wb3J0IGRucyBmcm9tIFwiZG5zXCJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCJcblxuZG5zLnNldERlZmF1bHRSZXN1bHRPcmRlcihcInZlcmJhdGltXCIpXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBhc3NldHNJbmNsdWRlOiBbXG4gICAgJy4vcHVibGljL3BpcGVyL29ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbScsXG4gICAgJy4vcHVibGljL3BpcGVyL3BpcGVyX3Bob25lbWl6ZS53YXNtJyxcbiAgICAnLi9wdWJsaWMvcGlwZXIvcGlwZXJfcGhvbmVtaXplLmRhdGEnLFxuICBdLFxuICB3b3JrZXI6IHtcbiAgICBmb3JtYXQ6ICdlcydcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBob3N0OiBcImxvY2FsaG9zdFwiXG4gIH0sXG4gIGRlZmluZToge1xuICAgIFwicHJvY2Vzcy5lbnZcIjogcHJvY2Vzcy5lbnZcbiAgfSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzc1xuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB2aXN1YWxpemVyKHtcbiAgICAgIHRlbXBsYXRlOiBcInRyZWVtYXBcIiwgLy8gb3Igc3VuYnVyc3RcbiAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgZ3ppcFNpemU6IHRydWUsXG4gICAgICBicm90bGlTaXplOiB0cnVlLFxuICAgICAgZmlsZW5hbWU6IFwiYnVuZGxlaW5zcGVjdG9yLmh0bWxcIiAvLyB3aWxsIGJlIHNhdmVkIGluIHByb2plY3QncyByb290XG4gICAgfSlcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiBbXG4gICAgICB7XG4gICAgICAgIGZpbmQ6IFwiQFwiLFxuICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHByb2Nlc3M6IFwicHJvY2Vzcy9icm93c2VyXCIsXG4gICAgICAgIHN0cmVhbTogXCJzdHJlYW0tYnJvd3NlcmlmeVwiLFxuICAgICAgICB6bGliOiBcImJyb3dzZXJpZnktemxpYlwiLFxuICAgICAgICB1dGlsOiBcInV0aWxcIixcbiAgICAgICAgZmluZDogL15+LisvLFxuICAgICAgICByZXBsYWNlbWVudDogKHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiB2YWwucmVwbGFjZSgvXn4vLCBcIlwiKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXVxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBUaGVzZSBzZXR0aW5ncyBlbnN1cmUgdGhlIHByaW1hcnkgSlMgYW5kIENTUyBmaWxlIHJlZmVyZW5jZXMgYXJlIGFsd2F5cyBpbmRleC57anMsY3NzfVxuICAgICAgICAvLyBzbyB3ZSBjYW4gU1NSIHRoZSBpbmRleC5odG1sIGFzIHRleHQgcmVzcG9uc2UgZnJvbSBzZXJ2ZXIvaW5kZXguanMgd2l0aG91dCBicmVha2luZyByZWZlcmVuY2VzIGVhY2ggYnVpbGQuXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnaW5kZXguanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgIGlmIChhc3NldEluZm8ubmFtZSA9PT0gJ2luZGV4LmNzcycpIHJldHVybiBgaW5kZXguY3NzYDtcbiAgICAgICAgICByZXR1cm4gYXNzZXRJbmZvLm5hbWU7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgLy8gUmVkdWNlcyB0cmFuc2Zvcm1hdGlvbiB0aW1lIGJ5IDUwJSBhbmQgd2UgZG9uJ3QgZXZlbiB1c2UgdGhpcyB2YXJpYW50LCBzbyB3ZSBjYW4gaWdub3JlLlxuICAgICAgICAvQHBob3NwaG9yLWljb25zXFwvcmVhY3RcXC9kaXN0XFwvc3NyLyxcbiAgICAgIF1cbiAgICB9LFxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWVcbiAgICB9XG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcIkBtaW50cGxleC1sYWJzL3BpcGVyLXR0cy13ZWJcIl0sXG4gICAgZXNidWlsZE9wdGlvbnM6IHtcbiAgICAgIGRlZmluZToge1xuICAgICAgICBnbG9iYWw6IFwiZ2xvYmFsVGhpc1wiXG4gICAgICB9LFxuICAgICAgcGx1Z2luczogW11cbiAgICB9XG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1pdC52aXJhbmlcXFxcRG9jdW1lbnRzXFxcXFByb2plY3QgamF5IEJyYW5jaFxcXFxhbnl0aGluZy1sbG1cXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1pdC52aXJhbmlcXFxcRG9jdW1lbnRzXFxcXFByb2plY3QgamF5IEJyYW5jaFxcXFxhbnl0aGluZy1sbG1cXFxcZnJvbnRlbmRcXFxccG9zdGNzcy5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL21pdC52aXJhbmkvRG9jdW1lbnRzL1Byb2plY3QlMjBqYXklMjBCcmFuY2gvYW55dGhpbmctbGxtL2Zyb250ZW5kL3Bvc3Rjc3MuY29uZmlnLmpzXCI7aW1wb3J0IHRhaWx3aW5kIGZyb20gJ3RhaWx3aW5kY3NzJ1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5pbXBvcnQgdGFpbHdpbmRDb25maWcgZnJvbSAnLi90YWlsd2luZC5jb25maWcuanMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcGx1Z2luczogW3RhaWx3aW5kKHRhaWx3aW5kQ29uZmlnKSwgYXV0b3ByZWZpeGVyXSxcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1pdC52aXJhbmlcXFxcRG9jdW1lbnRzXFxcXFByb2plY3QgamF5IEJyYW5jaFxcXFxhbnl0aGluZy1sbG1cXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1pdC52aXJhbmlcXFxcRG9jdW1lbnRzXFxcXFByb2plY3QgamF5IEJyYW5jaFxcXFxhbnl0aGluZy1sbG1cXFxcZnJvbnRlbmRcXFxcdGFpbHdpbmQuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9taXQudmlyYW5pL0RvY3VtZW50cy9Qcm9qZWN0JTIwamF5JTIwQnJhbmNoL2FueXRoaW5nLWxsbS9mcm9udGVuZC90YWlsd2luZC5jb25maWcuanNcIjsvKiogQHR5cGUge2ltcG9ydCgndGFpbHdpbmRjc3MnKS5Db25maWd9ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhcmtNb2RlOiBcImZhbHNlXCIsXG4gIGNvbnRlbnQ6IHtcbiAgICByZWxhdGl2ZTogdHJ1ZSxcbiAgICBmaWxlczogW1xuICAgICAgXCIuL3NyYy9jb21wb25lbnRzLyoqLyoue2pzLGpzeH1cIixcbiAgICAgIFwiLi9zcmMvaG9va3MvKiovKi5qc1wiLFxuICAgICAgXCIuL3NyYy9tb2RlbHMvKiovKi5qc1wiLFxuICAgICAgXCIuL3NyYy9wYWdlcy8qKi8qLntqcyxqc3h9XCIsXG4gICAgICBcIi4vc3JjL3V0aWxzLyoqLyouanNcIixcbiAgICAgIFwiLi9zcmMvKi5qc3hcIixcbiAgICAgIFwiLi9pbmRleC5odG1sXCIsXG4gICAgICBcIi4vbm9kZV9tb2R1bGVzL0B0cmVtb3IvKiovKi57anMsdHMsanN4LHRzeH1cIlxuICAgIF1cbiAgfSxcbiAgdGhlbWU6IHtcbiAgICBleHRlbmQ6IHtcbiAgICAgIHJvdGF0ZToge1xuICAgICAgICBcIjI3MFwiOiBcIjI3MGRlZ1wiLFxuICAgICAgICBcIjM2MFwiOiBcIjM2MGRlZ1wiXG4gICAgICB9LFxuICAgICAgY29sb3JzOiB7XG4gICAgICAgIFwiYmxhY2stOTAwXCI6IFwiIzE0MTQxNFwiLFxuICAgICAgICBhY2NlbnQ6IFwiIzNENDE0N1wiLFxuICAgICAgICBcInNpZGViYXItYnV0dG9uXCI6IFwiIzMxMzUzQVwiLFxuICAgICAgICBzaWRlYmFyOiBcIiMyNTI3MkNcIixcbiAgICAgICAgXCJoaXN0b3JpY2FsLW1zZy1zeXN0ZW1cIjogXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1wiLFxuICAgICAgICBcImhpc3RvcmljYWwtbXNnLXVzZXJcIjogXCIjMkMyRjM1XCIsXG4gICAgICAgIG91dGxpbmU6IFwiIzRFNTE1M1wiLFxuICAgICAgICBcInByaW1hcnktYnV0dG9uXCI6IFwiIzQ2QzhGRlwiLFxuICAgICAgICBzZWNvbmRhcnk6IFwiIzJDMkYzNlwiLFxuICAgICAgICBcImRhcmstaW5wdXRcIjogXCIjMTgxODFCXCIsXG4gICAgICAgIFwibW9iaWxlLW9uYm9hcmRpbmdcIjogXCIjMkMyRjM1XCIsXG4gICAgICAgIFwiZGFyay1oaWdobGlnaHRcIjogXCIjMUMxRTIxXCIsXG4gICAgICAgIFwiZGFyay10ZXh0XCI6IFwiIzIyMjYyOFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCIjRDJENURCXCIsXG4gICAgICAgIFwieC1idXR0b25cIjogXCIjOUNBM0FGXCIsXG4gICAgICAgIHJveWFsYmx1ZTogXCIjMDY1OTg2XCIsXG4gICAgICAgIHB1cnBsZTogXCIjNEExRkI4XCIsXG4gICAgICAgIG1hZ2VudGE6IFwiIzlFMTY1RlwiLFxuICAgICAgICBkYW5nZXI6IFwiI0YwNDQzOFwiLFxuICAgICAgICBlcnJvcjogXCIjQjQyMzE4XCIsXG4gICAgICAgIHdhcm46IFwiIzg1NDcwOFwiLFxuICAgICAgICBzdWNjZXNzOiBcIiMwNTYwM0FcIixcbiAgICAgICAgZGFya2VyOiBcIiNGNEY0RjRcIlxuICAgICAgfSxcbiAgICAgIGJhY2tncm91bmRJbWFnZToge1xuICAgICAgICBcInByZWZlcmVuY2UtZ3JhZGllbnRcIjpcbiAgICAgICAgICBcImxpbmVhci1ncmFkaWVudCgxODBkZWcsICM1QTVDNjMgMCUsIHJnYmEoOTAsIDkyLCA5OSwgMC4yOCkgMTAwJSk7XCIsXG4gICAgICAgIFwiY2hhdC1tc2ctdXNlci1ncmFkaWVudFwiOlxuICAgICAgICAgIFwibGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzNENDE0NyAwJSwgIzJDMkYzNSAxMDAlKTtcIixcbiAgICAgICAgXCJzZWxlY3RlZC1wcmVmZXJlbmNlLWdyYWRpZW50XCI6XG4gICAgICAgICAgXCJsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMzEzMjM2IDAlLCByZ2JhKDYzLjQwLCA2NC45MCwgNzAuMTMsIDApIDEwMCUpO1wiLFxuICAgICAgICBcIm1haW4tZ3JhZGllbnRcIjogXCJsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjM0Q0MTQ3IDAlLCAjMkMyRjM1IDEwMCUpXCIsXG4gICAgICAgIFwibW9kYWwtZ3JhZGllbnRcIjogXCJsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjM0Q0MTQ3IDAlLCAjMkMyRjM1IDEwMCUpXCIsXG4gICAgICAgIFwic2lkZWJhci1ncmFkaWVudFwiOiBcImxpbmVhci1ncmFkaWVudCg5MGRlZywgIzVCNjE2QSAwJSwgIzNGNDM0QiAxMDAlKVwiLFxuICAgICAgICBcImxvZ2luLWdyYWRpZW50XCI6IFwibGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzNENDE0NyAwJSwgIzJDMkYzNSAxMDAlKVwiLFxuICAgICAgICBcIm1lbnUtaXRlbS1ncmFkaWVudFwiOlxuICAgICAgICAgIFwibGluZWFyLWdyYWRpZW50KDkwZGVnLCAjM0Q0MTQ3IDAlLCAjMkMyRjM1IDEwMCUpXCIsXG4gICAgICAgIFwibWVudS1pdGVtLXNlbGVjdGVkLWdyYWRpZW50XCI6XG4gICAgICAgICAgXCJsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM1QjYxNkEgMCUsICMzRjQzNEIgMTAwJSlcIixcbiAgICAgICAgXCJ3b3Jrc3BhY2UtaXRlbS1ncmFkaWVudFwiOlxuICAgICAgICAgIFwibGluZWFyLWdyYWRpZW50KDkwZGVnLCAjM0Q0MTQ3IDAlLCAjMkMyRjM1IDEwMCUpXCIsXG4gICAgICAgIFwid29ya3NwYWNlLWl0ZW0tc2VsZWN0ZWQtZ3JhZGllbnRcIjpcbiAgICAgICAgICBcImxpbmVhci1ncmFkaWVudCg5MGRlZywgIzVCNjE2QSAwJSwgIzNGNDM0QiAxMDAlKVwiLFxuICAgICAgICBcInN3aXRjaC1zZWxlY3RlZFwiOiBcImxpbmVhci1ncmFkaWVudCgxNDZkZWcsICM1QjYxNkEgMCUsICMzRjQzNEIgMTAwJSlcIlxuICAgICAgfSxcbiAgICAgIGZvbnRGYW1pbHk6IHtcbiAgICAgICAgc2FuczogW1xuICAgICAgICAgIFwicGx1cy1qYWthcnRhLXNhbnNcIixcbiAgICAgICAgICBcInVpLXNhbnMtc2VyaWZcIixcbiAgICAgICAgICBcInN5c3RlbS11aVwiLFxuICAgICAgICAgIFwiLWFwcGxlLXN5c3RlbVwiLFxuICAgICAgICAgIFwiQmxpbmtNYWNTeXN0ZW1Gb250XCIsXG4gICAgICAgICAgJ1wiU2Vnb2UgVUlcIicsXG4gICAgICAgICAgXCJSb2JvdG9cIixcbiAgICAgICAgICAnXCJIZWx2ZXRpY2EgTmV1ZVwiJyxcbiAgICAgICAgICBcIkFyaWFsXCIsXG4gICAgICAgICAgJ1wiTm90byBTYW5zXCInLFxuICAgICAgICAgIFwic2Fucy1zZXJpZlwiLFxuICAgICAgICAgICdcIkFwcGxlIENvbG9yIEVtb2ppXCInLFxuICAgICAgICAgICdcIlNlZ29lIFVJIEVtb2ppXCInLFxuICAgICAgICAgICdcIlNlZ29lIFVJIFN5bWJvbFwiJyxcbiAgICAgICAgICAnXCJOb3RvIENvbG9yIEVtb2ppXCInXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBhbmltYXRpb246IHtcbiAgICAgICAgc3dlZXA6IFwic3dlZXAgMC41cyBlYXNlLWluLW91dFwiLFxuICAgICAgICBcInB1bHNlLWdsb3dcIjogXCJwdWxzZS1nbG93IDEuNXMgaW5maW5pdGVcIlxuICAgICAgfSxcbiAgICAgIGtleWZyYW1lczoge1xuICAgICAgICBzd2VlcDoge1xuICAgICAgICAgIFwiMCVcIjogeyB0cmFuc2Zvcm06IFwic2NhbGVYKDApXCIsIHRyYW5zZm9ybU9yaWdpbjogXCJib3R0b20gbGVmdFwiIH0sXG4gICAgICAgICAgXCIxMDAlXCI6IHsgdHJhbnNmb3JtOiBcInNjYWxlWCgxKVwiLCB0cmFuc2Zvcm1PcmlnaW46IFwiYm90dG9tIGxlZnRcIiB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhZGVJbjoge1xuICAgICAgICAgIFwiMCVcIjogeyBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgXCIxMDAlXCI6IHsgb3BhY2l0eTogMSB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhZGVPdXQ6IHtcbiAgICAgICAgICBcIjAlXCI6IHsgb3BhY2l0eTogMSB9LFxuICAgICAgICAgIFwiMTAwJVwiOiB7IG9wYWNpdHk6IDAgfVxuICAgICAgICB9LFxuICAgICAgICBcInB1bHNlLWdsb3dcIjoge1xuICAgICAgICAgIFwiMCVcIjoge1xuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogXCJzY2FsZSgxKVwiLFxuICAgICAgICAgICAgYm94U2hhZG93OiBcIjAgMCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wKVwiLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wKVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIjUwJVwiOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBcInNjYWxlKDEuMSlcIixcbiAgICAgICAgICAgIGJveFNoYWRvdzogXCIwIDAgMTVweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMilcIixcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSlcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCIxMDAlXCI6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB0cmFuc2Zvcm06IFwic2NhbGUoMSlcIixcbiAgICAgICAgICAgIGJveFNoYWRvdzogXCIwIDAgMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMClcIixcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMClcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy8gUmVxdWlyZWQgZm9yIHJlY2hhcnQgc3R5bGVzIHRvIHNob3cgc2luY2UgdGhleSBjYW4gYmUgcmVuZGVyZWQgZHluYW1pY2FsbHkgYW5kIHdpbGwgYmUgdHJlZS1zaGFrZW4gaWYgbm90IHNhZmUtbGlzdGVkLlxuICBzYWZlbGlzdDogW1xuICAgIHtcbiAgICAgIHBhdHRlcm46XG4gICAgICAgIC9eKGJnLSg/OnNsYXRlfGdyYXl8emluY3xuZXV0cmFsfHN0b25lfHJlZHxvcmFuZ2V8YW1iZXJ8eWVsbG93fGxpbWV8Z3JlZW58ZW1lcmFsZHx0ZWFsfGN5YW58c2t5fGJsdWV8aW5kaWdvfHZpb2xldHxwdXJwbGV8ZnVjaHNpYXxwaW5rfHJvc2UpLSg/OjUwfDEwMHwyMDB8MzAwfDQwMHw1MDB8NjAwfDcwMHw4MDB8OTAwfDk1MCkpJC8sXG4gICAgICB2YXJpYW50czogW1wiaG92ZXJcIiwgXCJ1aS1zZWxlY3RlZFwiXVxuICAgIH0sXG4gICAge1xuICAgICAgcGF0dGVybjpcbiAgICAgICAgL14odGV4dC0oPzpzbGF0ZXxncmF5fHppbmN8bmV1dHJhbHxzdG9uZXxyZWR8b3JhbmdlfGFtYmVyfHllbGxvd3xsaW1lfGdyZWVufGVtZXJhbGR8dGVhbHxjeWFufHNreXxibHVlfGluZGlnb3x2aW9sZXR8cHVycGxlfGZ1Y2hzaWF8cGlua3xyb3NlKS0oPzo1MHwxMDB8MjAwfDMwMHw0MDB8NTAwfDYwMHw3MDB8ODAwfDkwMHw5NTApKSQvLFxuICAgICAgdmFyaWFudHM6IFtcImhvdmVyXCIsIFwidWktc2VsZWN0ZWRcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdHRlcm46XG4gICAgICAgIC9eKGJvcmRlci0oPzpzbGF0ZXxncmF5fHppbmN8bmV1dHJhbHxzdG9uZXxyZWR8b3JhbmdlfGFtYmVyfHllbGxvd3xsaW1lfGdyZWVufGVtZXJhbGR8dGVhbHxjeWFufHNreXxibHVlfGluZGlnb3x2aW9sZXR8cHVycGxlfGZ1Y2hzaWF8cGlua3xyb3NlKS0oPzo1MHwxMDB8MjAwfDMwMHw0MDB8NTAwfDYwMHw3MDB8ODAwfDkwMHw5NTApKSQvLFxuICAgICAgdmFyaWFudHM6IFtcImhvdmVyXCIsIFwidWktc2VsZWN0ZWRcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdHRlcm46XG4gICAgICAgIC9eKHJpbmctKD86c2xhdGV8Z3JheXx6aW5jfG5ldXRyYWx8c3RvbmV8cmVkfG9yYW5nZXxhbWJlcnx5ZWxsb3d8bGltZXxncmVlbnxlbWVyYWxkfHRlYWx8Y3lhbnxza3l8Ymx1ZXxpbmRpZ298dmlvbGV0fHB1cnBsZXxmdWNoc2lhfHBpbmt8cm9zZSktKD86NTB8MTAwfDIwMHwzMDB8NDAwfDUwMHw2MDB8NzAwfDgwMHw5MDB8OTUwKSkkL1xuICAgIH0sXG4gICAge1xuICAgICAgcGF0dGVybjpcbiAgICAgICAgL14oc3Ryb2tlLSg/OnNsYXRlfGdyYXl8emluY3xuZXV0cmFsfHN0b25lfHJlZHxvcmFuZ2V8YW1iZXJ8eWVsbG93fGxpbWV8Z3JlZW58ZW1lcmFsZHx0ZWFsfGN5YW58c2t5fGJsdWV8aW5kaWdvfHZpb2xldHxwdXJwbGV8ZnVjaHNpYXxwaW5rfHJvc2UpLSg/OjUwfDEwMHwyMDB8MzAwfDQwMHw1MDB8NjAwfDcwMHw4MDB8OTAwfDk1MCkpJC9cbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdHRlcm46XG4gICAgICAgIC9eKGZpbGwtKD86c2xhdGV8Z3JheXx6aW5jfG5ldXRyYWx8c3RvbmV8cmVkfG9yYW5nZXxhbWJlcnx5ZWxsb3d8bGltZXxncmVlbnxlbWVyYWxkfHRlYWx8Y3lhbnxza3l8Ymx1ZXxpbmRpZ298dmlvbGV0fHB1cnBsZXxmdWNoc2lhfHBpbmt8cm9zZSktKD86NTB8MTAwfDIwMHwzMDB8NDAwfDUwMHw2MDB8NzAwfDgwMHw5MDB8OTUwKSkkL1xuICAgIH1cbiAgXSxcbiAgcGx1Z2luczogW11cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1osU0FBUyxvQkFBb0I7QUFDbmIsU0FBUyxlQUFlLFdBQVc7OztBQ0R5WCxPQUFPLGNBQWM7QUFDamIsT0FBTyxrQkFBa0I7OztBQ0F6QixJQUFPLDBCQUFRO0FBQUEsRUFDYixVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ04sUUFBUTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGFBQWE7QUFBQSxRQUNiLFFBQVE7QUFBQSxRQUNSLGtCQUFrQjtBQUFBLFFBQ2xCLFNBQVM7QUFBQSxRQUNULHlCQUF5QjtBQUFBLFFBQ3pCLHVCQUF1QjtBQUFBLFFBQ3ZCLFNBQVM7QUFBQSxRQUNULGtCQUFrQjtBQUFBLFFBQ2xCLFdBQVc7QUFBQSxRQUNYLGNBQWM7QUFBQSxRQUNkLHFCQUFxQjtBQUFBLFFBQ3JCLGtCQUFrQjtBQUFBLFFBQ2xCLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLFlBQVk7QUFBQSxRQUNaLFdBQVc7QUFBQSxRQUNYLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFFB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
