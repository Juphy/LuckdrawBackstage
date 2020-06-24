import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
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
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  selectedIndex = 0;
  loading = false;
  constructor(private http: HttpClient,
    private router: Router,
    private server: ServerService,
    private location: Location,
    private fb: FormBuilder,
    private el: ElementRef) {
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

  ngAfterViewInit(): void {
    let body = document.body;
    body.style.background = `url(assets/body.jpg)`;
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
    let id = '3', nickname = 'run', permissions = [{ "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 1 }, "type": 1, "name": "活动管理", "pid": 0, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "activity_manage", "id": 1 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 2 }, "type": 2, "name": "活动列表", "pid": 1, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "activity_list_manage", "id": 2 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 3 }, "type": 2, "name": "活动模板", "pid": 1, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "activity_template_manage", "id": 3 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 4 }, "type": 2, "name": "活动模板", "pid": 1, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "online_gallery_manage", "id": 4 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 5 }, "type": 1, "name": "广告管理", "pid": 0, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "ads_manage", "id": 5 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 6 }, "type": 2, "name": "广告列表", "pid": 5, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "ads_list_manage", "id": 6 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 7 }, "type": 2, "name": "广告位", "pid": 5, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "ads_position_manage", "id": 7 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 8 }, "type": 2, "name": "广告模板", "pid": 5, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "ads_template_manage", "id": 8 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 9 }, "type": 1, "name": "商品管理", "pid": 0, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "goods_manage", "id": 9 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 10 }, "type": 2, "name": "商品列表", "pid": 9, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "goods_list_manage", "id": 10 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 11 }, "type": 2, "name": "商品分类", "pid": 9, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "goods_category_manage", "id": 11 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 12 }, "type": 2, "name": "规格管理", "pid": 9, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "goods_spec_manage", "id": 12 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 13 }, "type": 1, "name": "店铺管理", "pid": 0, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "shop_manage", "id": 13 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 14 }, "type": 2, "name": "店铺列表", "pid": 13, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "shop_list_manage", "id": 14 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 15 }, "type": 2, "name": "分组管理", "pid": 13, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "goods_group_manage", "id": 15 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 16 }, "type": 1, "name": "营销管理", "pid": 0, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "market_manage", "id": 16 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 17 }, "type": 2, "name": "优惠券", "pid": 16, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "goods_coupon_manage", "id": 17 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 18 }, "type": 2, "name": "每日任务", "pid": 16, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "daily_task_manage", "id": 18 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 19 }, "type": 2, "name": "兑换红包", "pid": 16, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "exchange_money_manage", "id": 19 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 20 }, "type": 2, "name": "活动时长", "pid": 16, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "activity_time_manage", "id": 20 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 21 }, "type": 1, "name": "订单管理", "pid": 0, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "order_manage", "id": 21 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 22 }, "type": 2, "name": "商品订单", "pid": 21, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "goods_order_manage", "id": 22 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 23 }, "type": 2, "name": "活动订单", "pid": 21, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "activity_order_manage", "id": 23 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 24 }, "type": 2, "name": "活动充值订单", "pid": 21, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "activity_time_order_manage", "id": 24 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 25 }, "type": 2, "name": "提现账单", "pid": 21, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "cash_manage", "id": 25 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 26 }, "type": 1, "name": "权限管理", "pid": 0, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "permission_manage", "id": 26 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 27 }, "type": 2, "name": "权限管理", "pid": 26, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "permission_list_manage", "id": 27 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 28 }, "type": 1, "name": "用户管理", "pid": 0, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "user_manage", "id": 28 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 29 }, "type": 2, "name": "用户列表", "pid": 28, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "user_list_manage", "id": 29 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 30 }, "type": 1, "name": "系统设置", "pid": 0, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "sys_manage", "id": 30 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 31 }, "type": 2, "name": "常见问题", "pid": 30, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "question_answer_manage", "id": 31 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 32 }, "type": 2, "name": "意见反馈", "pid": 30, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "feedback_manage", "id": 32 }, { "created_at": "2020-06-23T23:29:04.560269", "pivot": { "role_id": 22, "permission_id": 33 }, "type": 2, "name": "日志记录", "pid": 30, "updated_at": "2020-06-23T23:29:04.560269", "belong_to": "pc", "display_name": "sys_log_manage", "id": 33 }], headimgurl = 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoPVya9FfbECrwNjVkuRDyE8kMIicSxVeCC2XWUsEINKScOGtbMAKlYXHUp308ibbWlibhgmYlI0Fj8g/132';
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
    let body = document.body;
    body.style.background = ``;
    if (this.interval$) {
      clearInterval(this.interval$);
      clearInterval(this.timer$);
    }
  }
}
