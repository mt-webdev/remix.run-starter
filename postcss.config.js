module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("postcss-import"),
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-custom-properties"),
    require("cssnano")({
      preset: "default",
    }),
  ],
};
