const path = require('path');

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,

  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    // Не в курсе зачем
    config.module
      .rule('html')
      .test(/\.html$/)
      .exclude.add(/index\.html/)
      .end()
      .set('loader', 'html-loader')
      .end();

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            { removeDimensions: false },
            { removeViewBox: false },
            {
              cleanupIDs: {
                prefix: {
                  toString() {
                    return Math.random().toString(36).substr(2, 9);
                  },
                },
              },
            },
          ],
        },
      });
  },
};
