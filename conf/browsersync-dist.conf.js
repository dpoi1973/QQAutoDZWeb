const conf = require('./gulp.conf');
const proxy = require('http-proxy-middleware');
const apiProxy = proxy('/api', {

  // target: 'http://192.168.0.74:1180',
  // target: 'http://192.168.0.55:1337',
  target: 'http://192.168.0.72:2377',
  // target: 'http://127.0.0.1:1377',
   // target: 'http://127.0.0.1:2377',
    // target: 'http://192.168.0.72:1180',

  proxyTable: {
    '/remote': 'http://192.168.0.70:3001',
    '/printer': 'http://192.168.0.70:5050',
    '/uploader': 'http://192.168.0.55:8092'
  },
  pathRewrite: {'^/api/remote': '/api', '^/api/printer': '', '^/api/uploader': '', '^/api': ''},
  changeOrigin: true // for vhosted sites
});

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.dist
      ],
      middleware: apiProxy
    },
    open: false
  };
};
