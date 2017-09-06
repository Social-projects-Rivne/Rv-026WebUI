const WebpackShellPlugin = require('webpack-shell-plugin');
var path = require('path');

var plugins = [];

plugins.push(new WebpackShellPlugin({
    onBuildStart: ['echo "Starting"'],
    onBuildEnd: ['npm run gulp nodemon:start']
  }));

module.exports = {
    entry: './static/js/index.js',
    output: {
        path: __dirname,
        publicPath:'/',
        filename: 'bundle.js'
    },
    watch: true,
    plugins: plugins,
    module: {
        rules:[
            {
                 test: /\.(js|jsx)$/,
                 exclude: /node_modules/,
                 loader:'babel-loader',
                 options:{
                     presets: ['react', 'es2015', 'stage-1']
                    },
            },
            {
                test: /\.(css|less)$/,
                use: [{
                    loader: 'style-loader'
                },
                { 
                    loader: 'css-loader'
                },
                {
                    loader: 'less-loader'
                }
                ]},

                {
                    test: /\.(png|gif|jpg|svg)$/,
                    use:{
                             loader: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
                         },
                         
                },
                {
                         test:/\.jsx$/,
                         exclude: [/node_modules/, /public/],
                         use:{
                             loader:'react-hot!babel?presets=es2015&retainLines=true',
                         },
                
              

                

            
        }],
        
    }
};