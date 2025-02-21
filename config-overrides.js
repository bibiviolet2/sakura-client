const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@viewmodels": path.resolve(__dirname, "src/viewmodels"),
    "@components": path.resolve(__dirname, "src/components"),
    "@services": path.resolve(__dirname, "src/services"),
    "@models": path.resolve(__dirname, "src/models"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@styles": path.resolve(__dirname, "src/styles"),
    "@pages": path.resolve(__dirname, "src/pages"),
  })
);
