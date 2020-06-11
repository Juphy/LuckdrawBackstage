export const SiteInfo = {
  site: 'https://www.wenquanpage.com',
  api: 'https://fw.wenquanpage.com',
  ucs: 'https://ucs.wenquanpage.com'
};
export const UserInfo = {
  name: '',
  id: '',
  headimgurl: '',
  permission: []
};
export const App = "min-backstage";
export const AppName = '一起拼手气';
export const DATA = {
  TOKEN: '',
  permission: []
};

// 主菜单
export const URL = {
  // 活动管理
  activity_manage: '/console/activity',
  // 广告管理
  ads_manage: "/console/ads",
  // 商品管理
  goods_manage: "/console/main",
  // 店铺管理
  shop_manage: '/console/shop',
  // 营销管理
  market_manage: "/console/market",
  // 订单管理
  order_manage: '/console/order',
  // 权限管理
  permission_manage: '/console/permission',
  // 用户管理
  user_manage: '/console/user/list',
  // 系统设置
  sys_manage: '/console/sys'
}

// 次级菜单
export const URLS = {
  // 活动列表
  activity_list_manage: '/console/activity/list',
  activity_template_manage: '/console/activity/template',

  // 广告列表
  ads_list_manage: "/console/ads/ads_list",
  ads_position_manage: '/console/ads/ads_position',

  // 产品管理
  goods_list_manage: "/console/main/main_list",
  // 分类
  goods_category_manage: "/console/main/category",

  // 店铺列表
  shop_list_manage: '/console/shop/list',
  // 分组列表
  goods_group_manage: '/console/shop/group',

  // 优惠券
  goods_coupon_manage: "/console/market/coupon",
  // 每日任务
  daily_task_manage: '/console/market/daily',
  // 兑换红包
  exchange_money_manage: '/console/market/exchange',

  // 商品订单
  goods_order_manage: '/console/order/goods',
  // 活动订单
  activity_order_manage: '/console/order/activity',
  // 活动充值订单
  activity_time_order_manage: '/console/order/exchange',

  // 权限列表
  permission_list_manage: '/console/permission/list',

  // 用户列表
  user_list_manage: '/console/user/list',

  // 常见问题
  question_answer_manage: '/console/sys/question',
  // 意见反馈
  feedback_manage: '/console/sys/feedback',
  // 活动价格
  activity_money_manage: '/console/sys/money',
}

// 控制图标
export const ICON = {
  activity_manage: 'appstore',
  ads_manage: 'project',
  goods_manage: 'shopping',
  shop_manage: 'shop',
  market_manage: 'table',
  order_manage: 'pound',
  permission_manage: 'trademark',
  user_manage: 'user',
  sys_manage: 'setting'
}

// 控制按钮
export let FN = {
  main: {},
  market: {},
  ads: {}
}

// option
export const Options = {
  'QA': []
};