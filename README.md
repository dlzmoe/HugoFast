## vue-admin-hugo

GitHub：[https://github.com/lovezsh/vue-admin-hugo/](https://github.com/lovezsh/vue-admin-hugo/)
主页：[https://lovezsh.github.io/vue-admin-hugo/](https://lovezsh.github.io/vue-admin-hugo/)

项目来源于我的突发奇想，并且基于热爱折腾的心理，利用GitHub本身提供的Api，将博客管理面板化。

暂未推出在线服务。

## How Use?

1. 前往 [https://github.com/settings/tokens/](https://github.com/settings/tokens/)
2. 获取以下权限：repo / user
3. 生成 token

## 介绍

**计划：**
- [ ] 为hugo博客写一个在线管理服务

**功能：**
- [x] 登陆 / 登出 / 手动刷新缓存
- [x] 获取用户仓库列表以及各种数据，仅限文章数据
- [x] 编辑/发布旧文章
- [ ] 修改旧文章的标题，时间，标签，分类等元数据
- [ ] 发布新文章
- [ ] 删除文章功能
- [ ] 自定义配置，如 博客名称, 域名, 昵称 等

**展示：**

样式目前还比较简陋，重心在主要功能架构上，后期重新设计UI。

![image](https://imgbed.netlify.app/images/image.5u1ybxnqk980.webp)
![image](https://imgbed.netlify.app/images/image.44obmiv90no0.webp)
![image](https://imgbed.netlify.app/images/image.1c2evayuvaz.webp)
![image](https://imgbed.netlify.app/images/image.237a8kiq3sxs.webp)

## 开发

```
yarn
yarn serve
yarn build
```
