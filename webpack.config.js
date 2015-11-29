module.exports = {
  entry: [
    './source/random-set.js'
  ],
  module: {
	  loaders: [
	    {
	      test: /\.js?$/,
	      exclude: /node_modules/,
	      loader: 'babel' // 'babel-loader' is also a legal name to reference
	    }
	  ]
  },  
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
};