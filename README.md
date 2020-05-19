# c-ui
## 特性
```
基于 Element 开发的 UI 组件
1、将element的input，select，dialog，datepicker,table进行封装全局注册，利用Vue内置标签component，动态的绑定这些组件，根据不同的配置更换不同的组件。
2、基于特性1，可快速配置form表单，表单项可以根据配置选择不同的组件。
3、将table和pagination分页进行合并封装，优化结构，同时表格的操作按钮也可配置生成
4、为了更加便捷的操作table，基于form二次封装了CQuery组件，可以快速搭建表格的查询组件
5、CDialog是类似于message的全局弹出组件，采用this.$CDialog(options)方式使用
```
## 安装
```
yarn add c-ui-cmq  / npm install c-ui-cmq --save
```

## 使用
```
import CUI from 'c-ui-cmq'
import 'c-ui-cmq/lib/theme-chalk/index.css'
Vue.use(CUI)
```
