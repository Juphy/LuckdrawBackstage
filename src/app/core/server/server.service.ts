import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DATA } from '@core/store';
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
  CouponList
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

}
