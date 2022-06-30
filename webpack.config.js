const path = require("path");
const outputPath = "public/";

module.exports = (env = {}, argv) => {
  const isProduction = argv.mode === "production";

  let config = {
    context: path.resolve(__dirname, "./"),
    entry: {
      script: ["./assets/js/form.js", "./assets/js/database-client.js"],
      game: ["./assets/js/game.js"]
    },
    output: {
      path: path.resolve(__dirname, outputPath),
      publicPath: "",
      filename: "./[name].js",
    },
    devtool: "source-map",

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: { name: "[name].css" },
            },

            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: { sourceMap: true },
            },
          ],
        },
      ],
    },
  };
  return config;
};