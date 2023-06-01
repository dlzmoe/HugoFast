export default {
  title: 'HugoFast',
  dest: '/dist',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  themeConfig: {
    siteTitle: '@lovezsh/HugoFast',
    nav: [
      { text: '使用文档', link: '/guide/index' },
      { text: 'Github', link: 'https://github.com/lovezsh/HugoFast/' },
    ],
    sidebar: [
      { text: '项目介绍', link: '/guide/index' },
      { text: '开发计划', link: '/guide/plan.md' },
      {
        text: '使用文档',
        items: [
          { text: '安装流程', link: '/guide/use.md' },
          { text: '演示图片', link: '/guide/demo.md' },
          { text: '开发/贡献', link: '/guide/dev.md' },
        ]
      },
    ],
    editLink: {
      pattern: 'https://github.com/lovezsh/HugoFast/edit/main/docs/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdatedText: '最后更新',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present lovezsh'
    }
  }
}
