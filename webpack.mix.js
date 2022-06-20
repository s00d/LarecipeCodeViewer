let mix = require('laravel-mix')

mix.webpackConfig({
    resolve: {
        fallback: {
            stream: require.resolve("stream-browserify"),
        }
    }
})

mix.setPublicPath('dist')
    .js('resources/js/asset.js', 'js')
    .sass('resources/sass/asset.scss', 'css')
    .vue({version: 2})
