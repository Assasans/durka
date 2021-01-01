const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',

	devtool: 'source-map',

	resolve: {
		extensions: ['.ts', '.tsx']
	},

	entry: {
		'bundle': './frontend/src/app.tsx',
		'bundle.min': './frontend/src/app.tsx'
	},
	output: {
		// filename: '[name].[chunkhash:8].js',
		filename: '[name].js',
		path: path.join(__dirname, 'frontend/static/js')
	},

	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				include: path.join(__dirname, 'frontend/src'),
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile : 'tsconfig.frontend.json'
						}
					}
				]
			},
			{
				test: /\.s[ac]ss$/,
				include: path.join(__dirname, 'frontend/scss'),
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: false
						}
					},
					{
						loader: 'postcss-loader',
						options: {
						}
					},
					{
						loader: 'sass-loader',
						options: {
							
						}
					}
				]
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader'
			}
		]
	},
	
	optimization: {
		/* minimize: true,
		minimizer: [
			new TerserPlugin({
				include: /\.min\.js$/,
				parallel: true,
				terserOptions: {
					mangle: true,
					keep_classnames: false,
					keep_fnames: false
				}
			}), */
			/* new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.optimize\.css$/g,
				cssProcessor: require('cssnano'),
				cssProcessorPluginOptions: {
					preset: ['default', { discardComments: { removeAll: true } }],
				},
				canPrint: true
			}) */
		// ]
	},

	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'react-router-dom': 'ReactRouterDOM'
	}
};
