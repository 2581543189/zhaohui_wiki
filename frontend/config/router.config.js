export default [
  //门面
  {
    path: "/",
    component: "../layouts/FacadeLayout"
  },
  // 登陆模块
  {
    path: '/login',
    component: '../layouts/LoginLayout',
    routes: [
      { path: '/login', redirect: '/login/main' },
      { path: '/login/main', component: './Login/Main' },//登陆页面
      { path: '/login/register', component: './Login/Register' },//注册用户页面
    ],
  },
  //网站
  {
    path: '/website',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],//umi会根据这个文件生成一个<switch><Router/>...</switch> 的结构 生成的时候调用React的createElement 方法 第一个参数是类型，默认是"react-router-dom".Route类型 配置了就用配置的类型.
    authority: ['admin', 'user','guest'],
    routes: [
      // dashboard
      { path: '/website', redirect: '/website/workbench/overview' },
      {
        path: '/website/workbench',
        name: 'workbench',
        icon: 'home',
        authority: ['admin', 'user','guest'],
        routes: [
          {
            path: '/website/workbench/overview',
            name: 'overview',
            component: './Workbench/Overview',
            icon: 'eye',
          },
          {
            path: '/website/workbench/footprint',
            name: 'footprint',
            component: './Workbench/Footprint',
            icon: 'form',
          },
          {
            path: '/website/workbench/ladder',
            name: 'ladder',
            component: './Workbench/Ladder',
            icon: 'read',
          },
          {
            path: '/website/workbench/note',
            name: 'note',
            component: './Workbench/Note',
            icon: 'bulb',
          },
          {
            path: '[nginxs]/api-docs/',
            name: 'apiDocs',
            icon: 'api',
            target:'_blank'
          },
        ],
      },
      //数据管理
      {
        path: '/website/data',
        name: 'data',
        icon: 'database',
        authority: ['admin'],
        routes: [
          {
            path: '/website/data/user',
            name: 'user',
            component: './Data/User',
            icon: 'user',
          },
          {
            path: '/website/data/skill',
            name: 'skill',
            component: './Data/Skill',
            icon: 'tool',
          },
          {
            path: '/website/data/article',
            name: 'article',
            component: './Data/Article',
            icon: 'form',
          },
          {
            path: '/website/data/book',
            name: 'book',
            component: './Data/Book',
            icon: 'read',
          },
          {
            path: '/website/data/notes',
            name: 'notes',
            component: './Data/Notes',
            icon: 'tag',
          },
          {
            path: '/website/data/bulletin',
            name: 'bulletin',
            component: './Data/Bulletin',
            icon: 'read',
          },
        ]
      }

    ]
  }
];
