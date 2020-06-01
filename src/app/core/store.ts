export const SiteInfo = {
  site: 'https://www.wenquanpage.com',
  api: 'https://fw.wenquanpage.com',
  ucs: 'https://ucs.wenquanpage.com'
};
export const UserInfo = {
  name: '',
  id: '',
  roles: [],
  info: {},
  permission: []
};
export const App = "min-backstage";
export const AppName = '一起拼手气';
export const DATA = {
  TOKEN: ''
};

// 主菜单
export const URL = {
  // 产品管理
  main: "/console/main",
  // 营销管理
  market: "/console/market",
  // 广告管理
  ads: "/console/ads",
  // 问题管理
  question: '/console/question'
}

// 次级菜单
export const URLS = {
  // 产品管理
  main_list: "/console/main/main_list",
  // 分类
  category: "/console/main/category",
  // 分组
  group: "/console/main/group",

  // 优惠券
  coupon: "/console/market/coupon",

  // 广告列表
  ads_list: "/console/ads/ads_list",
  ads_position: '/console/ads/ads_position',

  // 问题列表
  question_list: '/console/question/question_list'
}

// 控制图标
export const ICON = {
  main: 'appstore',
  market: 'user',
  ads: 'notification',
  question: 'question-circle'
}

// 控制按钮
export let FN = {
  main: {},
  market: {},
  ads: {}
}