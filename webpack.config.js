const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

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
    overlay: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      checkSyntacticErrors: true,
      watch: ["./src"] // optional but improves performance (fewer stat calls)
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [new TsconfigPathsPlugin()]
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
