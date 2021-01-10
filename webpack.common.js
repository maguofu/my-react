const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require("glob");

function entries() {
  let entryObj = {
    pageList: []
  };
  // 读取/src/pages/*/*.{js,ts}  即入口文件路径
  const PAGE_PATH = path.resolve(__dirname, './src/pages');
  const entryFiles = glob.sync(PAGE_PATH + '/*/*.{js,ts,tsx,jsx}', {
    ignore: PAGE_PATH + '/*/*.d.ts'
  })
  
  entryFiles.forEach((filePath) => {
    let name = filePath.split('/')[filePath.split('/').length - 2];
    entryObj.pageList.push({
      entry: `./${filePath.slice(filePath.indexOf('src'))}`,
      name: name,
    })
    console.log(`>>>>page is /${name}.html#/`)
  })
  console.log(entryObj)
  return entryObj;
}
const pages = entries();
// S获取入口map
let entryMap = {};
pages.pageList.map((item) => {
  let name = item.name;
  let entry = item.entry;
  entryMap[name] = entry;
  return
});
// E获取入口map
console.log(entryMap);
// S输出HTML文件  // 生成build的HTML文件
function getHtmls() {
  return pages.pageList.reduce((pre, cur)=>{
    let tempArr = [
      new HtmlWebpackPlugin({
        template: './publish/template.html',
        filename: `${cur.name}.html`,
        chunks: [
          `${cur.name}`,
          'vendors',
        ]
      })
    ]
    return pre.concat(tempArr);
  }, [])
}
// E输出HTML文件  // 生成build的HTML文件
module.exports = {
  entry: {
    ...entryMap
  },
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve:{
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@utils': path.resolve(__dirname, 'utils/'),
    },
    extensions: ['.jsx', '.tsx', '.ts', '.js', '.less', '.css', '.sass']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {  // 抽离第三方插件
            test: /[\\/]node_modules[\\/]/,     // 指定是node_modules下的第三方包
            name: "vendors",
            priority: -10                       // 抽取优先级
        },
        default: {
          minChunks: Infinity,
          priority: -20,
          reuseExistingChunk: true
        }
      },
    },
  },
  plugins: [
    // 分离css
    new miniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
    }),
  ].concat(getHtmls()),
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
             presets: ['env']
          }
        }]
      },
      {
        test: /\.(ts|tsx)?$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less|sass)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          // miniCssExtractPlugin.loader,
          // 'sass-loader',
          'css-loader',
          'less-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './static/images/[name].[contenthash:8].[ext]',
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
};