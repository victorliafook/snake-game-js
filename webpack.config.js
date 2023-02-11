module.exports = {
  entry:  './src',
  output: {
      path: __dirname + '/dist',
      filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};