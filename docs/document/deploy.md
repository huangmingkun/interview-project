# 部署vuepress

> 以下将讲述如何将vuepress文档部署到github pages，如果想部署到其它地方，请移步到[这里](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)学习

一、注册一个github账号后，然后新建一个仓库，新建仓库步骤如下图所示：

<img :src="$withBase('/assets/img/deploy/new-repository-step1.jpg')"/>

<hr>

我这里创建过同一个仓库了，所以就会有这样的提示,创建仓库完成后先放在一边

<img :src="$withBase('/assets/img/deploy/new-repository-step2.jpg')"/>

<hr>

二、 配置config.js的base参数(base参数要和github创建仓库名字一致)

 ```js {4}
module.exports = {
  title: 'VuePress',
  description: 'vuepress学习过程',
  base: '/vuepress/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    locales: {
      '/': {
        nav: [
          // {
          //   text: '中文',
          //   ariaLabel: 'Language Menu',
          //   items: [
          //     { text: '中文', link: '/' },
          //     { text: 'English', link: '/en/' }
          //   ]
          // },
          { text: 'Github', link: 'https://github.com/huangmingkun' },
          { text: 'vuepress官网', link: 'https://vuepress.vuejs.org/zh/'}
        ],
        sidebar: {
          '/':[
            {
              title: '文档介绍',   // 必要的
              path: '/',      // 可选的, 应该是一个绝对路径
              collapsable: false, // 可选的, 默认值是 true,
              sidebarDepth: 0,    // 可选的, 默认值是 1
              children: [
                {
                  // title: '基础',
                  collapsable: false,
                  sidebarDepth: 0,    // 可选的, 默认值是 1
                  children: [
                    ['document/start', '安装vuepress'],
                    ['document/layout', 'vuepress布局'],
                    ['document/deploy', '部署'],
                  ]
                }
              ]
            },
            {
              collapsable: false, // 可选的, 默认值是 true,
              title: 'TODO',
            }
          ]
        }
      }
    }
  }
}

```
三、设置部署指令
1. 在项目的更目录下创建deploy.sh文件（好处：部署时候不用自己一个代码一个代码地敲~）

<img :src="$withBase('/assets/img/deploy/deploy-directory.jpg')"/>

2. 创建好文件后，在文件输入以下代码（高亮部分的代码需要根据实际情况进行修改）
``` {23}
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'


# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages
# 例如我的github帐号名为huangmingkun，新建的仓库为vuepress，指令修改如下：
git push -f git@github.com:huangmingkun/vuepress.git master

cd -

```
3. 在package.json文件的scripts输入`"deploy": "bash deploy.sh"`,ps:用于执行deploy.sh文件
``` {8}
"scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build": "node build/build.js",
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "deploy": "bash deploy.sh"
  },
```
4. 全部配置完成后，即可运行npm run deploy 或者yarn run deploy，不出意外，文件都可以上传到github仓库了

打开github相应的仓库就可以看到下图所示的效果：

<img :src="$withBase('/assets/img/deploy/github-upload-success.jpg')"/>

::: warning tip
  如果在运行指令时候出现如下的错误，导致无法连接到github仓库的情况
:::
```
Warning: Permanently added the RSA host key for IP address '52.74.223.119' to the list of known hosts.
```

> 可以尝试着两个方法解决：[方法一](https://blog.csdn.net/comeonbabe_/article/details/80244854)[方法二](https://www.cnblogs.com/sineik/p/9210928.html)

四、配置github

步骤一：

<img :src="$withBase('/assets/img/deploy/github-setting1.jpg')"/>

步骤二：

<img :src="$withBase('/assets/img/deploy/github-setting2.jpg')"/>
