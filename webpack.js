const path = require('path');

module.exports = {
    mode: 'development', // Set the mode to development or production
    entry: {
        index: './src/index.ts', // Additional entry point for TypeScript
        demo: './demo/demo.js', // Additional entry point for the demo
    },
    output: {
        filename: '[name].js', // Output bundle file name based on entry name
        path: path.resolve(__dirname, 'dist'), // Output directory
        publicPath: '/', // Public URL of the output directory when referenced in a browser
        library: 'react-domnest', // Export the bundle as a library
        libraryTarget: 'umd', // Universal Module Definition (UMD)
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.tsx?$/, // Regex to match .ts and .tsx files
                exclude: /node_modules/, // Exclude node_modules directory
                use: {
                    loader: 'ts-loader', // Use TypeScript loader for transpiling
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts'], // Resolve these extensions
    },
    devtool: 'source-map', // Enable source maps for easier debugging
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // Serve content from the dist directory
        compress: true, // Enable gzip compression
        port: 9000, // Port for the dev server
    },
};
