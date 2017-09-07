const TypedocWebpackPlugin = require("typedoc-webpack-plugin");
const path = require("path");

module.exports = {
	devtool: "source-map",
	entry: "./index.ts",
	output: {
		path: path.resolve("docs/"),
		publicPath: "/assets/js/",
		filename: "index.js"
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
			out: "docs/",
			tsconfig: "node_modules/rayity/tsconfig.json",
			mode: "modules",
			excludeNotExported: true,
			hideGenerator: true,
			theme: "markdown"
		}, "/Users/Graham/Projects/rayity")
	]
};