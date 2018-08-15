const path = require("path");
const webpack = require("webpack");
//const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "development",
  entry: { app: "./src/index.tsx" },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "public")
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./public",
    hot: true,
    open: true,
    overlay: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [new TsconfigPathsPlugin()]
    //modules: ["node_modules", path.resolve(__dirname, "src")]
    // plugins: [
    //   new TsConfigPathsPlugin({
    //     forceIsolatedModules: true
    //   })
    // ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            reportFiles: ["src/**/*.{ts,tsx}"]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        use: "file-loader"
      }
    ]
  }
};
