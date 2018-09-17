const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

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
    filename: "amount-input.js",
    library: "amountInput"
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
