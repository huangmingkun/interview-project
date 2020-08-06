module.exports = {
  title: 'VuePress',
  description: '对项目的难点实现进行记录',
  base: '/vuepress/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    locales: {
      '/': {
        nav: [
          {
            text: '中文',
            ariaLabel: 'Language Menu',
            items: [
              { text: '中文', link: '/' },
              { text: 'English', link: '/en/' }
            ]
          },
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
      },
      '/en/': {
        nav: [
          {
            text: 'Languages',
            ariaLabel: 'Language Menu',
            items: [
              { text: '中文', link: '/' },
              { text: 'English', link: '/en/' }
            ]
          },
          { text: 'Home', link: '/' },
          { text: 'Guide', link: 'https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F%E9%93%BE%E6%8E%A5'}
        ]
      }
    }
  }
}
