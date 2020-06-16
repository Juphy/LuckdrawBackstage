import { Component, OnInit, OnDestroy } from '@angular/core';
import { DATA, UserInfo, URL } from "@core/store";
import { HttpClient } from "@angular/common/http";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { ServerService } from '@core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  selectedIndex = 0;
  loading = false;
  constructor(private http: HttpClient,
    private router: Router,
    private server: ServerService,
    private location: Location,
    private fb: FormBuilder) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        let path: any = event.url.split('?')[1];
        if (path) {
          this.bgLoading = true;
          let params = {};
          path.split('&').forEach(p => {
            if (p) {
              p = p.split('=');
              params[p[0]] = p[1];
            }
          })
          this.server.wechat__get_service_user_info(params).subscribe(res => {
            this.bgLoading = false;
            if (res.status === 200) {
              res = res['result'];
              let { id, nickname, permissions, headimgurl } = res;
              permissions = permissions.filter(item => item.belong_to === 'pc')
              UserInfo['id'] = id;
              UserInfo['name'] = nickname;
              UserInfo['headimgurl'] = headimgurl;
              UserInfo['permission'] = permissions;
              console.log(UserInfo);
              // localStorage存储信息
              localStorage.setItem('name', nickname);
              localStorage.setItem('id', id.toString());
              localStorage.setItem('headimgurl', headimgurl);
              localStorage.setItem('permission', JSON.stringify(permissions));
              this.router.navigateByUrl('/index');
            }
          }, err => {
            this.bgLoading = false;
            this.num = 475;
            this.get_time$();
          })
        } else {
          this.get_time$();
        }
      }
    })
    this.form = fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
    })
  }

  form: FormGroup;

  get userName() {
    return this.form.controls.userName;
  }

  get password() {
    return this.form.controls.password;
  }

  get mobile() {
    return this.form.controls.mobile;
  }

  get captcha() {
    return this.form.controls.captcha;
  }

  bgLoading = false;

  ngOnInit() {
    // 伪造数据
    // this.login();
  }

  submit() {
    let params = {};
    switch (this.selectedIndex) {
      case 0:
        this.userName.markAsDirty();
        this.userName.updateValueAndValidity();
        this.password.markAsDirty();
        this.password.updateValueAndValidity();
        if (this.userName.invalid || this.password.invalid) return;
        break;
      case 1:
        this.mobile.markAsDirty();
        this.mobile.updateValueAndValidity();
        this.captcha.markAsDirty();
        this.captcha.updateValueAndValidity();
        if (this.mobile.invalid || this.captcha.invalid) return;
        break;
    }
    // 请求接口 params;
  }

  login() {
    let id = '3', nickname = 'run', permissions = [{ "pivot": { "role_id": 20, "permission_id": 1 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 1, "display_name": "activity_manage", "name": "活动管理", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 1, "pid": 0 }, { "pivot": { "role_id": 20, "permission_id": 2 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 2, "display_name": "activity_list_manage", "name": "活动列表", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 1 }, { "pivot": { "role_id": 20, "permission_id": 3 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 3, "display_name": "activity_template_manage", "name": "活动模板", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 1 }, { "pivot": { "role_id": 20, "permission_id": 4 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 4, "display_name": "ads_manage", "name": "广告管理", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 1, "pid": 0 }, { "pivot": { "role_id": 20, "permission_id": 5 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 5, "display_name": "ads_list_manage", "name": "广告列表", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 4 }, { "pivot": { "role_id": 20, "permission_id": 6 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 6, "display_name": "ads_position_manage", "name": "广告位置", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 4 }, { "pivot": { "role_id": 20, "permission_id": 7 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 7, "display_name": "goods_manage", "name": "商品管理", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 1, "pid": 0 }, { "pivot": { "role_id": 20, "permission_id": 8 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 8, "display_name": "goods_list_manage", "name": "商品列表", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 7 }, { "pivot": { "role_id": 20, "permission_id": 9 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 9, "display_name": "goods_category_manage", "name": "商品分类", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 7 }, { "pivot": { "role_id": 20, "permission_id": 10 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 10, "display_name": "shop_manage", "name": "店铺管理", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 1, "pid": 0 }, { "pivot": { "role_id": 20, "permission_id": 11 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 11, "display_name": "shop_list_manage", "name": "店铺列表", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 10 }, { "pivot": { "role_id": 20, "permission_id": 12 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 12, "display_name": "goods_group_manage", "name": "分组管理", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 10 }, { "pivot": { "role_id": 20, "permission_id": 13 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 13, "display_name": "market_manage", "name": "营销管理", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 1, "pid": 0 }, { "pivot": { "role_id": 20, "permission_id": 14 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 14, "display_name": "goods_coupon_manage", "name": "优惠券", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 13 }, { "pivot": { "role_id": 20, "permission_id": 15 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 15, "display_name": "daily_task_manage", "name": "每日任务", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 13 }, { "pivot": { "role_id": 20, "permission_id": 16 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 16, "display_name": "exchange_money_manage", "name": "兑换红包", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 13 }, { "pivot": { "role_id": 20, "permission_id": 17 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 17, "display_name": "activity_time_manage", "name": "活动时长", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 13 }, { "pivot": { "role_id": 20, "permission_id": 18 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 18, "display_name": "order_manage", "name": "订单管理", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 1, "pid": 0 }, { "pivot": { "role_id": 20, "permission_id": 19 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 19, "display_name": "goods_order_manage", "name": "商品订单", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 18 }, { "pivot": { "role_id": 20, "permission_id": 20 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 20, "display_name": "activity_order_manage", "name": "活动订单", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 18 }, { "pivot": { "role_id": 20, "permission_id": 21 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 21, "display_name": "activity_time_order_manage", "name": "活动充值订单", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 18 }, { "pivot": { "role_id": 20, "permission_id": 22 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 22, "display_name": "permission_manage", "name": "权限管理", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 1, "pid": 0 }, { "pivot": { "role_id": 20, "permission_id": 23 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 23, "display_name": "permission_list_manage", "name": "权限管理", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 22 }, { "pivot": { "role_id": 20, "permission_id": 24 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 24, "display_name": "user_manage", "name": "用户管理", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 1, "pid": 0 }, { "pivot": { "role_id": 20, "permission_id": 25 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 25, "display_name": "user_list_manage", "name": "用户列表", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 24 }, { "pivot": { "role_id": 20, "permission_id": 26 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 26, "display_name": "sys_manage", "name": "系统设置", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 1, "pid": 0 }, { "pivot": { "role_id": 20, "permission_id": 27 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 27, "display_name": "question_answer_manage", "name": "常见问题", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 26 }, { "pivot": { "role_id": 20, "permission_id": 28 }, "updated_at": "2020-06-14T12:57:27.446746", "id": 28, "display_name": "feedback_manage", "name": "意见反馈", "created_at": "2020-06-14T12:57:27.446746", "belong_to": "pc", "type": 2, "pid": 26 }], headimgurl = 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoPVya9FfbECrwNjVkuRDyE8kMIicSxVeCC2XWUsEINKScOGtbMAKlYXHUp308ibbWlibhgmYlI0Fj8g/132';
    permissions = permissions.filter(item => item.belong_to === 'pc')
    UserInfo['id'] = id;
    UserInfo['name'] = nickname;
    UserInfo['headimgurl'] = headimgurl;
    UserInfo['permission'] = permissions;
    console.log(UserInfo);
    // localStorage存储信息
    localStorage.setItem('name', nickname);
    localStorage.setItem('id', id.toString());
    localStorage.setItem('headimgurl', headimgurl);
    localStorage.setItem('permission', JSON.stringify(permissions));
  }

  count = 0;
  captchaLoading = false;
  interval$: any;
  get_captcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(this.interval$)
      }
    }, 1000);
  }

  flag = false; //true 普通登录  false扫码登录
  erweima = "assets/erweima.jpg";
  imgLoading = false; // true 正在加载  false 加载二维码完成
  change_flag() {
    this.flag = !this.flag;
    clearInterval(this.timer$);
    if (!this.flag) {
      this.num = 1;
      this.get_time$();
    }
  }

  timer$: any;
  num = 0;
  get_time$() {
    this.timer$ = setInterval(() => {
      this.num += 1;
    }, 250)
  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
      clearInterval(this.timer$);
    }
  }
}
