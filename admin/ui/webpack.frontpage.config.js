const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ['./src-frontpage/index.tsx'],
  plugins: [
    new HtmlWebpackPlugin({
      template: "src-frontpage/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.frontpage.json',
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js'],
  },
  output: {
    filename: 'aesa-frontpage.js',
    path: path.resolve(__dirname, 'public', 'frontpage'),
  },
  devServer: {
    port: 3001, // you can change the port
  },
};
