const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: { app: "./src/index.tsx" },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public")
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./public",
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    // Directories where to look for modules.
    modules: ["node_modules", path.resolve(__dirname, "src")],
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
