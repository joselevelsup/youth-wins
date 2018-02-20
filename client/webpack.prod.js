var merge = require("webpack-merge");
var Uglify = require("uglifyjs-webpack-plugin");
var config = require("./webpack.config");

module.exports = merge(config, {
  plugins: [
    new Uglify()
  ]
});
