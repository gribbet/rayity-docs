const TypedocWebpackPlugin = require("typedoc-webpack-plugin");

module.exports = {
	devtool: "source-map",
	entry: "./index.ts",
	output: {
		filename: "docs/index.js"
	},
	resolve: {
		extensions: [".js", ".ts"]
	},
	module: {
		rules: [{
			enforce: "pre",
			test: /\.js$/,
			loader: "source-map-loader"
		}, {
			test: /\.ts$/,
			loader: "ts-loader"
		}]
	},
	plugins: [
		new TypedocWebpackPlugin({
			out: "docs/docs",
			tsconfig: "node_modules/rayity/tsconfig.json",
			exclude: "rayity/**/node_modules/**/*.*",
			mode: "modules",
			includes: "includes",
			excludeNotExported: true,
			hideGenerator: true,
			theme: "markdown"
		}, "node_modules/rayity/src")
	]
};