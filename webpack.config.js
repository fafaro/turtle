'use strict';

module.exports = {
    entry: './index2.ts',
    devtool: "inline-source-map",
    output: { filename: 'bundle.js' },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js.'
        }
    },
    externals: {
        //'react': 'React',
        //'react-dom': 'ReactDOM'
    }
};