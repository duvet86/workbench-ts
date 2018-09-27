const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  mode: "production",
  entry: { app: "./src/index.tsx" },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new CleanWebpackPlugin("build"),
    new Dotenv({
      path: path.resolve(__dirname, ".prod.env")
    }),
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      checkSyntacticErrors: true,
      watch: ["./src"] // optional but improves performance (fewer stat calls)
    }),
    // new webpack.DefinePlugin({
    //   "process.env": {
    //     NODE_ENV: JSON.stringify("production"),
    //     BASE_URL: JSON.stringify("http://lmarang-au-de01/mine"),
    //     TENANT_ID: JSON.stringify("demo"),
    //     TOKEN_KEY: JSON.stringify("token"),
    //     TIME_TO_LIVE: JSON.stringify(1200)
    //   }
    // }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "public/index.html"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: "asset-manifest.json"
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      logger(message) {
        if (message.indexOf("Total precache size is") === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf("Skipping static resource") === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: path.resolve(__dirname, "public/index.html"),
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    strictExportPresence: true,
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   enforce: "pre",
      //   use: [
      //     { loader: "cache-loader" },
      //     {
      //       loader: "thread-loader",
      //       options: {
      //         // there should be 1 cpu for the fork-ts-checker-webpack-plugin
      //         workers: 2
      //       }
      //     },
      //     {
      //       loader: "tslint-loader",
      //       options: {
      //         // tslint errors are displayed by default as warnings
      //         // set emitErrors to true to display them as errors
      //         emitErrors: true,
      //         // tslint does not interrupt the compilation by default
      //         // if you want any file with tslint errors to fail
      //         // set failOnHint to true
      //         failOnHint: true,
      //         // enables type checked rules like 'for-in-array'
      //         // uses tsconfig.json from current working directory
      //         typeCheck: true
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.tsx?$/,
        use: [
          // { loader: "cache-loader" },
          // {
          //   loader: "thread-loader",
          //   options: {
          //     // there should be 1 cpu for the fork-ts-checker-webpack-plugin
          //     workers: 2
          //   }
          // },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              reportFiles: ["src/**/*.{ts,tsx}"]
              // happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      }
    ]
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
