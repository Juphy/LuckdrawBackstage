import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DATA, Options } from '@core/store';
import {
  HttpResponse,
  EditCategory,
  DelCategory,
  EditShop,
  DelShop,
  EditSpec,
  DelSpec,
  EditSpecvalue,
  DelSpecvalue,
  EditSpu,
  DelGroup,
  DelSpu,
  EditGroup,
  ChangeGroupshow,
  GroupList,
  CategoryList,
  SpuList,
  SpuInfo,
  SpuSkus,
  SpuChangeStatus,
  AddSpec,
  SpecList,
  EditSkus,
  EditCoupon,
  ChangeCouponStatus,
  DelCoupon,
  CouponList,
  AdsList,
  EditAdPosition,
  AdPositionStatus,
  AdPositionAds,
  EditAds,
  DelAds,
  ChangeSort,
  UpdateClickNum,
  QuestionAnswers,
  SysOptions,
  EditQuestion,
  DelQuestion,
  UserInfo,
  RoleAdd,
  RoleEdit,
  RoleValid,
  RoleInvalid,
  RoleInfo,
  RoleBinds,
  RoleList,
  UserList,
  TemplateList,
  DelTemplate,
  ShopList,
  ShopInfo,
  OrderGoodsList,
  OrderActivities,
  OrderActivitiesTimes,
  FeedbackList,
  HandleFeedback,
  EditDailyTasks,
  DelDailyTask,
  ExchangeMoneyList,
  EditExchangeMoney,
  ChangeExchangeMoneyStatus,
  DelExchangeMoney,
  ActivityManagerList
} from "./types";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  // 编辑、添加商品分类
  goods__edit_category(params: EditCategory): Observable<any> {
    return this.http.post<HttpResponse>('goods/edit_category', params);
  }

  // 删除商品分类
  goods__del_category(params: DelCategory): Observable<any> {
    return this.http.post<HttpResponse>('goods/del_category', params);
  }

  // 商品分类列表
  goods__category_list(params: CategoryList): Observable<any> {
    return this.http.post<HttpResponse>('goods/category_list', params);
  }

  // 编辑、创建店铺
  goods__edit_shop(params: EditShop): Observable<any> {
    return this.http.post<HttpResponse>('goods/edit_shop', params);
  }

  // 删除店铺
  goods__del_shop(params: DelShop): Observable<any> {
    return this.http.post<HttpResponse>('goods/del_shop', params);
  }

  // 添加、编辑规格
  goods__edit_spec(params: EditSpec): Observable<any> {
    return this.http.post<HttpResponse>('goods/edit_spec', params)
  }

  // 删除规格
  goods__del_spec(params: DelSpec): Observable<any> {
    return this.http.post<HttpResponse>('goods/del_spec', params)
  }

  // 添加规格
  goods__add_spec(params: AddSpec): Observable<any> {
    return this.http.post<HttpResponse>('goods/add_spec', params)
  }

  // 添加规格值
  goods__edit_spec_value(params: EditSpecvalue): Observable<any> {
    return this.http.post<HttpResponse>('goods/edit_spec_value', params)
  }

  // 删除规格值
  goods__del_spec_value(params: DelSpecvalue): Observable<any> {
    return this.http.post<HttpResponse>('goods/del_spec_value', params);
  }

  // 添加、编辑商品
  goods__edit_spu(params: EditSpu): Observable<any> {
    return this.http.post<HttpResponse>('goods/edit_spu', params);
  }

  // 删除商品
  goods__del_spu(params: DelSpu): Observable<any> {
    return this.http.post<HttpResponse>('goods/del_spu', params);
  }

  // 添加、编辑分组
  goods__edit_group(params: EditGroup): Observable<any> {
    return this.http.post<HttpResponse>('goods/edit_group', params);
  }

  // 删除分组
  goods__del_group(params: DelGroup): Observable<any> {
    return this.http.post<HttpResponse>('goods/del_group', params);
  }

  // 改变分组是否隐藏
  goods__change_group_show(params: ChangeGroupshow): Observable<any> {
    return this.http.post<HttpResponse>('goods/change_group_show', params);
  }

  // 产品分组列表
  goods__group_list(params: GroupList): Observable<any> {
    return this.http.post<HttpResponse>('goods/group_list', params);
  }

  // 商品列表
  goods__spu_list(params: SpuList): Observable<any> {
    return this.http.post<HttpResponse>('goods/spu_list', params);
  }

  // 商品详情
  goods__spu_info(params: SpuInfo): Observable<any> {
    return this.http.post<HttpResponse>('goods/spu_info', params);
  }

  // 商品规格
  goods__spu_skus(params: SpuSkus): Observable<any> {
    return this.http.post<HttpResponse>('goods/spu_skus', params);
  }

  // 商品上下架
  goods__spu_change_status(params: SpuChangeStatus): Observable<any> {
    return this.http.post<HttpResponse>('goods/spu_change_status', params);
  }

  // 商品规格列表
  goods__spec_list(params: SpecList): Observable<any> {
    return this.http.post<HttpResponse>('goods/spec_list', params);
  }

  // 编辑商品skus
  goods__edit_skus(params: EditSkus): Observable<any> {
    return this.http.post<HttpResponse>('goods/edit_skus', params);
  }

  // 添加或者编辑优惠券
  goods__edit_coupon(params: EditCoupon): Observable<any> {
    return this.http.post<HttpResponse>('goods/edit_coupon', params);
  }

  // 修改优惠券生效、失效
  goods__change_coupon_status(params: ChangeCouponStatus): Observable<any> {
    return this.http.post<HttpResponse>('goods/change_coupon_status', params);
  }

  // 删除优惠券
  goods__del_coupon(params: DelCoupon): Observable<any> {
    return this.http.post<HttpResponse>('goods/del_coupon', params);
  }

  // 优惠券列表
  goods__coupon_list(params: CouponList): Observable<any> {
    return this.http.post<HttpResponse>('goods/coupon_list', params);
  }

  // 广告列表
  ads__list(params: AdsList): Observable<any> {
    return this.http.post<HttpResponse>('ads/list', params);
  }

  // 广告位置列表
  ads__ad_position_list(): Observable<any> {
    return this.http.get<HttpResponse>('ads/ad_position_list');
  }

  // 编辑广告位置
  ads__edit_ad_position(params: EditAdPosition): Observable<any> {
    return this.http.post<HttpResponse>('ads/edit_ad_position', params);
  }

  // 修改广告位置状态
  ads__ad_position_info(params: AdPositionStatus): Observable<any> {
    return this.http.post<HttpResponse>('ads/change_ad_position_status', params);
  }

  // 广告位置的广告
  ads__position_ads(params: AdPositionAds): Observable<any> {
    return this.http.post<HttpResponse>('ads/ad_position_ads', params);
  }

  // 添加或编辑广告
  ads__edit_ads(params: EditAds): Observable<any> {
    return this.http.post<HttpResponse>('ads/edit_ads', params);
  }

  // 删除广告
  ads__del_ads(params: DelAds): Observable<any> {
    return this.http.post<HttpResponse>('ads/edit_ads', params);
  }

  // 修改广告排序位置
  ads__change_sort(params: ChangeSort): Observable<any> {
    return this.http.post<HttpResponse>('ads/change_sort', params);
  }

  // 更新广告点击次数
  ads__update_click_num(params: UpdateClickNum): Observable<any> {
    return this.http.post<HttpResponse>('ads/update_click_num', params);
  }

  // 内部店铺
  shop__inside_shop(): Observable<any> {
    return this.http.get<HttpResponse>('shop/inside_shop')
  }

  // 广告详情
  ads__ads_info(params: any): Observable<any> {
    return this.http.post<HttpResponse>('ads/ads_info', params);
  }

  // 常见问题列表
  manager__question_answers(params: QuestionAnswers): Observable<any> {
    return this.http.post<HttpResponse>('manager/question_answers', params);
  }

  // 编辑添加问题
  manager__edit_question_answer(params: EditQuestion): Observable<any> {
    return this.http.post<HttpResponse>('manager/edit_question_answer', params)
  }

  // 删除问题
  manager__del_question_answer(params: DelQuestion): Observable<any> {
    return this.http.post<HttpResponse>('manager/del_question_answer', params);
  }

  // question type
  get_question_type(params: SysOptions): Observable<any> {
    if (Options.question_answer.length) {
      return of(Options.question_answer);
    } else {
      return this.home__sys_options(params).pipe(
        map(e => {
          Options.question_answer = e['result'] || [];
          return Options.question_answer;
        })
      )
    }
  }

  home__sys_options(params: SysOptions): Observable<any> {
    return this.http.post<HttpResponse>('home/sys_options', params);
  }

  // 获取用户信息
  wechat__get_service_user_info(params: UserInfo): Observable<any> {
    return this.http.post<HttpResponse>('wechat/get_service_user_info', params)
  }

  // 角色列表
  role__list(params: RoleList): Observable<any> {
    return this.http.post<HttpResponse>('role/list', params);
  }

  // 添加角色
  role__add(params: RoleAdd): Observable<any> {
    return this.http.post<HttpResponse>('role/add', params)
  }

  // 编辑角色
  role__edit(params: RoleEdit): Observable<any> {
    return this.http.post<HttpResponse>('role/edit', params)
  }

  // 禁用角色
  role__valid(params: RoleValid): Observable<any> {
    return this.http.post<HttpResponse>('role/valid', params)
  }

  // 恢复角色
  role__invalid(params: RoleInvalid): Observable<any> {
    return this.http.post<HttpResponse>('role/invalid', params);
  }

  // 角色信息
  role__info(params: RoleInfo): Observable<any> {
    return this.http.post<HttpResponse>('role/info', params)
  }

  // 绑定或者解绑角色
  role__binds(params: RoleBinds): Observable<any> {
    return this.http.post<HttpResponse>('role/binds', params)
  }

  // 获取权限
  role__permissions(): Observable<any> {
    if (DATA.permission.length) {
      return of(DATA.permission)
    } else {
      return this.http.get('role/permissions').pipe(
        map(e => {
          DATA.permission = e['result'] || [];
          return DATA.permission;
        })
      )
    }
  }

  // 用户列表
  manager__user_list(params: UserList): Observable<any> {
    return this.http.post<HttpResponse>('manager/user_list', params)
  }

  // 模板列表
  activity__template_list(params: TemplateList): Observable<any> {
    return this.http.post<HttpResponse>('activity/template_list', params);
  }

  // 删除模板
  activity__del_template(params: DelTemplate): Observable<any> {
    return this.http.post<HttpResponse>('activity/del_template', params);
  }

  // 获取template_type
  get_template_type(params: SysOptions): Observable<any> {
    if (Options.template.length) {
      return of(Options.template)
    } else {
      return this.home__sys_options(params).pipe(
        map(e => {
          Options.template = e['result'] || [];
          return Options.template;
        })
      )
    }
  }

  // 店铺列表
  shop__lists(params: ShopList): Observable<any> {
    return this.http.post('shop/lists', params);
  }

  // 店铺信息
  shop__info(params: ShopInfo): Observable<any> {
    return this.http.post('shop/info', params);
  }

  // 商品订单列表
  order__goods_lists(params: OrderGoodsList): Observable<any> {
    return this.http.post('order/goods', params);
  }

  // 活动订单
  order__activities(params: OrderActivities): Observable<any> {
    return this.http.post('order/activities', params);
  }

  // 活动充值订单
  order__activity_times(params: OrderActivitiesTimes): Observable<any> {
    return this.http.post('order/activity_times', params);
  }

  // 反馈列表
  manager__feedback_list(params: FeedbackList): Observable<any> {
    return this.http.post('manager/feedback_list', params);
  }

  // 处理反馈
  manager__handle_feedback(params: HandleFeedback): Observable<any> {
    return this.http.post('manager/handle_feedback', params);
  }

  // 每日任务列表
  manager__daily_task_list(): Observable<any> {
    return this.http.get('manager/daily_task_list');
  }

  // 添加编辑每日任务
  manager__edit_daily_tasks(params: EditDailyTasks): Observable<any> {
    return this.http.post('manager/edit_daily_tasks', params);
  }

  // 删除每日任务
  manager__del_daily_task(params: DelDailyTask): Observable<any> {
    return this.http.post('manager/del_daily_task', params)
  }

  // 兑换红包列表
  manager__exchange_money_list(params: ExchangeMoneyList): Observable<any> {
    return this.http.post('manager/exchange_money_list', params)
  }

  // 添加编辑兑换红包
  manager__edit_exchange_money(params: EditExchangeMoney): Observable<any> {
    return this.http.post<HttpResponse>('manager/edit_exchange_money', params);
  }

  // 修改红包状态
  manager__change_exchange_money_status(params: ChangeExchangeMoneyStatus): Observable<any> {
    return this.http.post<HttpResponse>('manager/change_exchange_money_status', params);
  }

  // 删除红包
  manager__del_exchange_money(params: DelExchangeMoney): Observable<any> {
    return this.http.post('manager/del_exchange_money', params);
  }

  // 活动列表
  activity__manager_list(params: ActivityManagerList): Observable<any> {
    return this.http.post('activity/manager_list', params);
  }

}
