const path = require("path");
const outputPath = "public/";

module.exports = (env = {}, argv) => {
  
  let config = {
    context: path.resolve(__dirname, "./"),
    entry: {
      app: ["./assets/js/app.js"] 
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
