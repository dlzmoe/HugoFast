## vue-admin-hugo

https://github.com/lovezsh/vue-admin-hugo/

项目来源于我的突发奇想，并且基于热爱折腾的心理，利用GitHub本身提供的Api，将博客管理面板化。

## 介绍

**计划：**
- [ ] 为hugo博客写一个在线管理服务
- [ ] 暂未对接token信息，所以没有做鉴权，通过仓库名只能访问数据

**功能：**
- [x] 登陆 / 登出 / 手动刷新缓存
- [x] 获取用户仓库列表以及各种数据，仅限文章数据
- [ ] 编辑旧文章
- [ ] 发布新文章
- [ ] 自定义配置，如 博客名称, 域名, 昵称 等

**展示：**

样式目前还比较简陋，重心在主要功能架构上，后期重新设计UI。

![image](https://imgbed.netlify.app/images/image.5u1ybxnqk980.webp)
![image](https://imgbed.netlify.app/images/image.44obmiv90no0.webp)
![image](https://imgbed.netlify.app/images/image.1c2evayuvaz.webp)
![image](https://imgbed.netlify.app/images/image.237a8kiq3sxs.webp)

**参考：**
- https://segmentfault.com/a/1190000015144126#item-0-3
- https://api.github.com/repos/lovezsh/hugo-blog
- https://api.github.com/repos/lovezsh/hugo-blog/contents/content/blog


## How Use?

```
yarn
yarn serve
yarn build
```
