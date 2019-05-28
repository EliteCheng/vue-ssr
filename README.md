# About
这是学习Vue全家桶+SSR的笔记Code

# 使用方法
```shell
git clone https://github.com/EliteCheng/vue-ssr.git
```
进入项目目录，运行
```shell
npm install
```
然后执行
```shell
npm run dev
```
开始开发项目

# 项目部署
```shell
npm i -g pm2
#进入到项目目录，执行
pm2 start pm2.yml --env production
#重启服务
pm2 restart vue-todo
#停止服务
pm2 stop vue-todo
#查看服务
pm2 list
pm2 log vue-todo

```
