const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const env = process.env.NODE_ENV;
const libraryTarget = process.env.LIBRARY_TARGET;
let names = {
  var: "amount-input",
  commonjs2: "amount-input.commonjs2"
};
let eslint = {
  production: ".eslintrc",
  development: ".eslintrc.development"
};

module.exports = {
  entry: `${__dirname}/src/amount-input.js`,
  devtool: "source-map",
  target: "web",
  mode: "production",
  node: {
    fs: "empty"
  },

  output: {
    path: `${__dirname}/dist/`,
    filename: `${names[libraryTarget]}.js`,
    library: "amountInput",
    libraryTarget: libraryTarget
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          "babel-loader",
          `eslint-loader?configFile=${eslint[env]}`
        ],
        include: [`${__dirname}/src/`],
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin({sourceMap: true})
  ]
};
