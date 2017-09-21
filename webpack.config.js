module.exports = {
  entry: [
    './static/js/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
          test: /\.css$/,
          loader: "style-loader!css-loader!autoprefixer-loader",
          exclude: [/node_modules/, /public/]
      },
      {
          test: /\.gif$/,
          loader: "url-loader?limit=10000&mimetype=image/gif"
      },
      {
          test: /\.jpg$/,
          loader: "url-loader?limit=10000&mimetype=image/jpg"
      },
      {
          test: /\.png$/,
          loader: "url-loader?limit=10000&mimetype=image/png"
      },
      {
          test: /\.svg/,
          loader: "url-loader?limit=26000&mimetype=image/svg+xml"
      },
      {
          test: /\.jsx$/,
          loader: "react-hot!babel?presets=es2015&retainLines=true",
          exclude: [/node_modules/, /public/]
      },
      {
          test: /\.json$/,
          loader: "json-loader"
      }
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
