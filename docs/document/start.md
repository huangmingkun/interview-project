# 安装vuepress

## 本文档以`局部安装`为例，全局安装的请移步到[这里](https://www.vuepress.cn/guide/getting-started.html#%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85)

``` bash
# 在项目的根目录下运行该指令
# 安装为本地依赖项(依赖webpack 3.x 的项目，官方推荐使用Yarn)
yarn add -D vuepress # 或 npm install -D vuepress

# 等待上述指令执行完成，再创建一个 docs 目录(手动建一个文件夹也可以)
mkdir docs
# 创建一个 markdown 文件(手动建一个md文件夹并输入内容也可以)
echo '# Hello VuePress' > docs/README.md

```
::: warning 注意
 请确保你的 Node.js 版本 >= 8.6。
:::

完成上述步骤后（所有文件夹都需要手动或者通过代码新建），项目的结构如下图所示：

<img :src="$withBase('/assets/img/start/first-directory.jpg')"/>

然后，给 package.json 添加一些 scripts 脚本(方便运行vuepress)
``` bash
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
运行指令(npm run docs:dev或者yarn run docs:dev),即可开始编写文档了，打开链接，不出意外的话，你应该可以看到之前在docs/README.md里面写的内容了，效果如下：

<img :src="$withBase('/assets/img/start/first-effect.jpg')"/>

> 你现在看到的界面是不是觉得简陋~别急..接下来进行讲述简单布局的配置
