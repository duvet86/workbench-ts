const path = require("path");
const webpack = require("webpack");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const postcssNormalize = require("postcss-normalize");

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = "/";

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve("style-loader"),
    {
      loader: require.resolve("css-loader"),
      options: cssOptions
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve("postcss-loader"),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          require("postcss-preset-env")({
            autoprefixer: {
              flexbox: "no-2009"
            },
            stage: 3
          }),
          // Adds PostCSS Normalize as the reset css with default options,
          // so that it honors browserslist config in package.json
          // which in turn let's users customize the target behavior as per their needs.
          postcssNormalize()
        ],
        sourceMap: true
      }
    }
  ].filter(Boolean);

  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve("resolve-url-loader"),
        options: {
          sourceMap: true
        }
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true
        }
      }
    );
  }

  return loaders;
};

module.exports = {
  mode: "development",
  // Enable sourcemaps for debugging webpack's output.
  devtool: "cheap-module-source-map",
  entry: "./src/index.tsx",
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    filename: "static/js/bundle.js",
    // TODO: remove this when upgrading to webpack 5
    futureEmitAssets: true,
    chunkFilename: "static/js/[name].chunk.js",
    path: path.resolve(__dirname, "public"),
    publicPath,
    // this defaults to 'window', but by setting it to 'this' then
    // module chunks which are built will work in web workers as well.
    globalObject: "this"
  },
  optimization: {
    minimize: false,
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: "all"
    },
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // https://github.com/facebook/create-react-app/issues/5358
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    }
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [
      // Adds support for installing with Plug'n'Play, leading to faster installs and adding
      // guards against forgotten dependencies and such.
      PnpWebpackPlugin,
      new TsconfigPathsPlugin()
    ],
    alias: {
      react: path.resolve(__dirname, "node_modules/react")
    }
  },
  resolveLoader: {
    plugins: [
      // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
      // from the current package.
      PnpWebpackPlugin.moduleLoader(module)
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // process ts/tsx files
          {
            test: /\.tsx?$/,
            use: {
              loader: require.resolve("ts-loader"),
              options: PnpWebpackPlugin.tsLoaderOptions({
                transpileOnly: true,
                reportFiles: ["src/**/*.{ts,tsx}"]
              })
            },
            exclude: /node_modules/
          },
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /\.svg$/,
            use: ["@svgr/webpack"]
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use MiniCSSExtractPlugin to extract that CSS
          // to a file, but in development "style" loader enables hot editing
          // of CSS.
          // By default we support CSS Modules with the extension .module.css
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: true
            }),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve("file-loader"),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, ".dev.env")
    }),
    new webpack.NamedModulesPlugin(),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "public/index.html")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new ForkTsCheckerWebpackPlugin(
      PnpWebpackPlugin.forkTsCheckerOptions({
        eslint: true,
        checkSyntacticErrors: true,
        async: true,
        useTypescriptIncrementalApi: true,
        reportFiles: [
          "**",
          "!**/__tests__/**",
          "!**/?(*.)(spec|test).*",
          "!**/src/setupProxy.*",
          "!**/src/setupTests.*"
        ]
      })
    ),
    // Generate an asset manifest file with the following content:
    // - "files" key: Mapping of all asset filenames to their corresponding
    //   output file so that tools can pick it up without having to parse
    //   `index.html`
    // - "entrypoints" key: Array of files which are included in `index.html`,
    //   can be used to reconstruct the HTML if necessary
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath: publicPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          fileName => !fileName.endsWith(".map")
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles
        };
      }
    }),
    new DuplicatePackageCheckerPlugin()
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    module: "empty",
    dgram: "empty",
    dns: "mock",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  devServer: {
    publicPath: publicPath,
    contentBase: "./public",
    useLocalIp: true,
    host: "0.0.0.0",
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    // clientLogLevel: "none",
    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.hooks[...].tap` calls above.
    //quiet: true,
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    hot: true,
    open: true,
    overlay: true,
    historyApiFallback: true,
    stats: "minimal"
  }
};
