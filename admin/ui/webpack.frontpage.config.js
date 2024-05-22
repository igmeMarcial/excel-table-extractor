const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src-frontpage/index.tsx'],
  devtool: 'source-map', // Añadir sourcemaps para debug
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src-frontpage/index.html',
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
            transpileOnly: true, // Acelera la compilación habilitando la transpilación solo
            compilerOptions: {
              sourceMap: true, // Generar sourcemaps
            },
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: 'url-loader',
        options: { limit: false },
      },
    ],
  },
  resolve: {
    // extensions: ['.ts', '.tsx', '.jsx', '.js'],
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  output: {
    filename: 'aesa-frontpage.js',
    path: path.resolve(__dirname, 'public', 'frontpage'),
    sourceMapFilename: '[file].map', // Definir nombres de archivo para sourcemaps
  },
  devServer: {
    port: 3001, // you can change the port
  },
};
