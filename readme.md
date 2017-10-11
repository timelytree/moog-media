# displaced

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Utilities
Vue Meta: https://github.com/declandewet/vue-meta#meta-object
WP CORS: https://github.com/Shelob9/rest-all-cors

For ES6 js files that don't resolve properly, need to add the following lines to webpack.base.conf.js:

```javascript
{
  test: /\.js$/,
  loader: 'babel-loader',
  include: [resolve('src'), resolve('test'), resolve('node_modules/yt-player')]
}
```
As well, .babelrc needs to be modified (remove 'modules: false')
