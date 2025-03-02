const { override, addBabelPlugins, addWebpackAlias, addWebpackModuleRule, disableEsLint } = require("customize-cra");
const path = require("path");

module.exports = override(
  disableEsLint(), // 📌 Zakáže ESLint warnings během buildu

  // 📌 Přidáme Babel pluginy pro dekorátory a metadata
  addBabelPlugins(
    "babel-plugin-transform-typescript-metadata", // ✅ OPRAVA pro `emitDecoratorMetadata`
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ),

  // 📌 Použijeme `ts-loader` pro TypeScript soubory
  addWebpackModuleRule({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true
      }
    }
  }),

  // 📌 ZAKÁŽE source-map-loader pro `node_modules`, aby neházel varování
  addWebpackModuleRule({
    test: /\.js$/,
    enforce: "pre",
    exclude: /node_modules/, // ✅ Přidáno: ignoruje všechny soubory v `node_modules`
    use: ["source-map-loader"]
  }),

  addWebpackAlias({
    "@viewmodels": path.resolve(__dirname, "src/viewmodels"),
    "@components": path.resolve(__dirname, "src/components"),
    "@services": path.resolve(__dirname, "src/services"),
    "@models": path.resolve(__dirname, "src/models"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@styles": path.resolve(__dirname, "src/styles"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@lib": path.resolve(__dirname, "src/lib"),
    "@graphql": path.resolve(__dirname, "src/graphql"),
    "@decorator": path.resolve(__dirname, "src/decorator"),
    "@plugins": path.resolve(__dirname, "src/plugins"),
  })
);
