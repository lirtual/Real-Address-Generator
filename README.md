# 真实地址生成器

中文 / [English](README_EN.md)

## Demo

在线使用: [https://real-address-generator-3li.pages.dev/](https://real-address-generator-3li.pages.dev/)

## 功能特点

- 生成随机的真实地址信息,包括姓名、性别、电话和详细地址
- 支持多个国家的地址生成
- 可视化地图显示生成的地址位置
- 保存和管理生成的地址
- 支持中英文双语界面

## 技术栈

- HTML5
- CSS3
- JavaScript (原生)
- Google Fonts
- Font Awesome 图标库

## 使用说明

1. 打开`index.html`文件在浏览器中运行应用
2. 从下拉菜单选择desired国家
3. 点击"生成地址"按钮获取新的随机地址
4. 点击"保存地址"按钮并添加备注来保存当前地址
5. 在表格中查看和管理已保存的地址

## 项目结构

- `index.html`: 主要的HTML结构
- `styles.css`: 样式表文件
- `script.js`: JavaScript逻辑代码
- `functions/api/address.js`: 后端API函数(用于地址生成)

## 部署说明 (Cloudflare Pages)

1. 确保您的项目已经推送到 GitHub 仓库。

2. 登录您的 Cloudflare 账户，进入 "Pages" 部分。

3. 点击 "创建项目" 按钮。

4. 选择 "连接到 Git" 选项，然后选择包含您项目的 GitHub 仓库。

5. 在配置页面：
   - 设置项目名称
   - 生产分支选择 `main` 或您的主分支
   - 构建设置：
     - 构建命令：留空（因为这是静态网站）
     - 构建输出目录：留空或填写 `/`

6. 点击 "保存并部署"。

7. Cloudflare Pages 将自动部署您的网站。部署完成后，您将获得一个 `*.pages.dev` 的网址。

8. （可选）如果您想使用自定义域名，可以在项目设置中添加并配置您的域名。

注意：如果您的项目使用了环境变量（如 API 密钥），请在 Cloudflare Pages 的项目设置中的 "环境变量" 部分添加这些变量。

## 自定义

您可以通过修改`styles.css`文件来自定义应用的外观,或者编辑`script.js`来调整功能逻辑。

## 贡献

欢迎提交问题和拉取请求来改进这个项目。

## 许可证

此项目使用 MIT 许可证。

## 版权声明

该项目基于 [Adonis142857](https://github.com/Adonis142857/Real-Address-Generator) 修改。