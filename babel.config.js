module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }], // ✅ keep this if you're using NativeWind with JSX transform
    ],
    plugins: ["nativewind/babel"], // ✅ this must go in plugins, not presets
  };
};
