# 主题定制
本章节介绍如何定制系统主题。

## 一、自定义主题色
### （一）简述

这种方式比较灵活，用户可以自定义任意一种主题颜色。
本项目就是采用这种方式。
这种方式的优点是我们无需准备多套主题，用户可以自由动态换肤；缺点是自定义不够，只支持基础颜色的切换。

<img :src="$withBase('/assets/img/vue-llplatform/theme-any.gif')" />

::: tip 提示
参考[vue-element-admin 更换主题](https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/theme.html)
:::

### （二）原理

element-ui 2.0 版本之后所有的样式都是基于 SCSS 编写的，所有的颜色都是基于几个基础颜色变量来设置的，所以就不难实现动态换肤了，只要找到那几个颜色变量修改它就可以了。

Element官方实现了一个demo：[在线主题生成工具](https://elementui.github.io/theme-chalk-preview)。作者在[issue](https://github.com/ElemeFE/element/issues/3054)中回复了他的方案：
1. 先把默认主题文件中涉及到颜色的 CSS 值替换成关键词：[源码](https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L250-L274)
2. 根据用户选择的主题色生成一系列对应的颜色值：[源码](https://github.com/ElementUI/theme-preview/blob/master/src/utils/formula.json)
3. 把关键词再换回刚刚生成的相应的颜色值：[源码](https://github.com/ElementUI/theme-preview/blob/master/src/utils/color.js)
4. 直接在页面上加 style 标签，把生成的样式填进去[源码](https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L198-L211)

**根据以上方案，简单说明一下我们的原理**：

首先我们需要通过 package.json 拿到 element-ui 的版本号，根据该版本号去请求相应的样式。拿到样式之后将样色，通过正则匹配和替换，将颜色变量替换成你需要的，之后动态添加 style 标签来覆盖原有的 css 样式。
::: tip 提示
这里需要获取 element-ui 的版本号，从而锁定版本，以免将来 Element 升级时受到非兼容性更新的影响。
:::

### （三）实现

1. 创建`ThemePicker`组件（创建`src/components/ThemePicker.vue`文件）：
``` vue
<template>
  <el-color-picker
    v-model="theme"
    class="theme-picker"
    :predefine="predefineColors"
    popper-class="theme-picker-dropdown"/>
</template>

<script>
const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color
export default {
  data () {
    return {
      chalk: '', // content of theme-chalk css
      predefineColors: [
        '#537AA3',
        '#986858',
        '#967A58',
        '#A38445',
        '#9C9256',
        '#849D46',
        '#619647',
        '#458F8F',
        '#5463A3',
        '#72539F',
        '#A04C7A',
        '#9C4348'
      ],
      theme: ORIGINAL_THEME
    }
  },
  watch: {
    theme (val, oldVal) {
      if (typeof val !== 'string') return
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
          const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)
          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }
      const chalkHandler = getHandler('chalk', 'chalk-style')
      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        this.getCSSString(url, chalkHandler, 'chalk')
      } else {
        chalkHandler()
      }
      const styles = [].slice.call(document.querySelectorAll('style'))
        .filter(style => {
          const text = style.innerText
          return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        })
      styles.forEach(style => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      })
      localStorage.setItem('user-theme', val)
    }
  },
  methods: {
    updateStyle (style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },
    getCSSString (url, callback, variable) {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
          callback()
        }
      }
      xhr.open('GET', url)
      xhr.send()
    },
    getThemeCluster (theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)
        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))
          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)
          return `#${red}${green}${blue}`
        }
      }
      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)
        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)
        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)
        return `#${red}${green}${blue}`
      }
      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  },
  mounted () {
    // #537AA3 设置默认的颜色
    const lastTheme = localStorage.getItem('user-theme') || '#537AA3'
    // const lastTheme = localStorage.getItem('user-theme') || ORIGINAL_THEME
    this.theme = lastTheme
  }
}
</script>

<style>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
  background-color: rgba(255, 255, 255, 0.7);
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
```
::: tip 提示
此处使用了Element的[颜色选择器](http://element-cn.eleme.io/#/zh-CN/component/color-picker)组件。
以上源码基于[vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/)的[ThemePicker组件](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/ThemePicker/index.vue)作了相应修改：支持记住用户上次使用的主题；添加显示推荐颜色；修改颜色选择器的背景颜色。
:::

2. 在指定地方（`src/views/layout/TheLayoutHeader.vue`）添加`ThemePicker`组件，提供主题切换功能：
``` vue {4,9,14}
<template>
  <div>
    ...
    <theme-picker></theme-picker>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'

export default {
  ...
  components: {
    ThemePicker
  }
}
</script>
```
