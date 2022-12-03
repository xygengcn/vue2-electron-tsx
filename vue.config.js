const { resolve } = require('path');
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/render/main-render/main.ts'
    }
  },
  pluginOptions: {
    electronBuilder: {
      // Use this to change the entrypoint of your app's main process
      mainProcessFile: 'src/main/index.ts',
      mainProcessWatch: ['src/main'],
      preload: {
        preload: resolve('src/preload/index.ts'),
        otherPreload: resolve('src/preload/index2.ts')
      }
    }
  }
};
