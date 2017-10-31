TO DO
- [] press links

# Utilities
Vue Meta: https://github.com/declandewet/vue-meta#meta-object
WP CORS: https://github.com/Shelob9/rest-all-cors
Vue Masonry: https://github.com/paulcollett/vue-masonry-css

For ES6 js files that don't resolve properly, need to add the following lines to webpack.base.conf.js:

```javascript
{
  test: /\.js$/,
  loader: 'babel-loader',
  include: [resolve('src'), resolve('test'), resolve('node_modules/yt-player')]
}
```
As well, .babelrc needs to be modified (remove 'modules: false')
