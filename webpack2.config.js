var path = require('path');



module.exports = {
    entry: './static/js/index.js',
    output: {
        path: __dirname,
        publicPath:'/',
        filename: 'bundle.js'
    },
   
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