const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
let libraryTarget = process.env.LIBRARY_TARGET;
let names = {
  var: "amount-input",
  commonjs2: "amount-input.commonjs2"
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
        use: ["babel-loader"],
        include: [`${__dirname}/src/`],
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin({sourceMap: true})
  ]
};
