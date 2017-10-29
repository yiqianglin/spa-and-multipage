const path = require('path');
const autoprefixer = require('autoprefixer');

const postcssConfig = {
	autoprefixer: {
	// 自动前缀的配置
		pc: [
			'last 3 versions',
			'Explorer >= 8',
			'Chrome >= 21',
			'Firefox >= 1',
			'Edge 13'
		],
		app: ['Android >= 4', 'iOS >= 6']
	},
	postcssSprites: {
	    retina: true,	// 是否识别分辨率标识，默认为true。分辨率标识指的是类似@2x的文件名标识，比如存在两个图标文件logo.png和logo@2x.png并且style文件中对两张图标都有引用，如果配置retina:true，boi将把两种分辨率的图片分别合并为一张sprites图片，否则会编译到同一张sprites图片里
	    verbose: true,	// 将插件输出打印到控制台
	    spritePath: './dist/images', // 雪碧图合并后存放地址，相对路径
	    stylesheetPath: '../dist/css',	// 保存输出样式表的文件夹的相对路径。如果为空，则将使用CSS文件的路径。
	    basePath: './',	// Your base path that will be used for images with absolute CSS urls.
	    spritesmith: {	// 将图像转换为精简图和坐标图。
	      padding: 2
	    },
	    filterBy(image) {
	      // 定义过滤器函数，该函数将处理在样式表中创建的图像列表。
	      // 每个函数必须返回一个Promise应解决或拒绝的函数。
	      console.log('能不能找到/images/sprite/：', image.url.indexOf('/images/sprite/') !== -1);
	      if (image.url.indexOf('/images/sprite/') === -1) {
	        return Promise.reject();
	      }
	      return Promise.resolve();
	    },
	    // groupBy(image) {
	    //   // 定义将处理您的样式表中创建的图像列表的组函数。
	    //   return spritesGroupBy(image);
	    // },
	    // hooks: {
	    //   // 挂钩 定义是否在文件名中搜索视网膜标记。
	    //   onUpdateRule(rule, comment, image) {
	    //   	// Hook允许重写图像的CSS输出。
	    //     var spriteUrl = image.spritePath.replace('dist', '');
	    //     image.spriteUrl = argv.local
	    //       ? spriteUrl
	    //       : `/${project[config.appName].contentPath}${spriteUrl}?t=${+new Date()}`;
	    //     return spritesOnUpdateRule(true, rule, comment, image);
	    //   },
	    //   onSaveSpritesheet(opts, groups) {
	    //   	// Hook允许重写生成的spritesheet的数据。
	    //     return spritesOnSaveSpritesheet(true, opts, groups);
	    //   }
	    // }
  	}
}


module.exports = ({ file, options, env }) => {
	console.log('---------------------------------');
	console.log(file, options, env);
	return {
	  parser: file.extname === '.sss' ? 'sugarss' : false,
	  plugins: {
	    'postcss-import': { root: file.dirname },
	    'postcss-cssnext': options.cssnext ? options.cssnext : false,
	    'autoprefixer': env == 'production' ? options.autoprefixer : false,
	    'cssnano': env === 'production' ? options.cssnano : false
	  }
	}

}
