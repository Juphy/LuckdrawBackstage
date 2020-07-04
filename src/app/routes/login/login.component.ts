import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { DATA, UserInfo, URL } from "@core/store";
import { HttpClient } from "@angular/common/http";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { ServerService } from '@core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  selectedIndex = 0;
  loading = false;
  src: any = '';
  constructor(private http: HttpClient,
    private router: Router,
    private server: ServerService,
    private location: Location,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private el: ElementRef) {
    this.http.get('wechat/qrconnect_url').subscribe(res => {
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(res['result']);
    })
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
    body.style.backgroundImage = `url(assets/body.jpg)`;
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
    this.login();
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
    let id = '3', nickname = 'run', permissions = [{ "pid": 0, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "活动管理", "belong_to": "pc", "display_name": "activity_manage", "type": 1, "id": 1 }, { "pid": 1, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "活动列表", "belong_to": "pc", "display_name": "activity_list_manage", "type": 2, "id": 2 }, { "pid": 1, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "活动模板", "belong_to": "pc", "display_name": "activity_template_manage", "type": 2, "id": 3 }, { "pid": 1, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "在线图库", "belong_to": "pc", "display_name": "online_gallery_manage", "type": 2, "id": 4 }, { "pid": 0, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "广告管理", "belong_to": "pc", "display_name": "ads_manage", "type": 1, "id": 5 }, { "pid": 5, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "广告列表", "belong_to": "pc", "display_name": "ads_list_manage", "type": 2, "id": 6 }, { "pid": 5, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "广告位", "belong_to": "pc", "display_name": "ads_position_manage", "type": 2, "id": 7 }, { "pid": 5, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "广告主", "belong_to": "pc", "display_name": "advertiser_manage", "type": 2, "id": 8 }, { "pid": 0, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "商品管理", "belong_to": "pc", "display_name": "goods_manage", "type": 1, "id": 9 }, { "pid": 9, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "商品库", "belong_to": "pc", "display_name": "goods_list_manage", "type": 2, "id": 10 }, { "pid": 9, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "线上商品", "belong_to": "pc", "display_name": "online_goods_manage", "type": 2, "id": 11 }, { "pid": 9, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "商品分类", "belong_to": "pc", "display_name": "goods_category_manage", "type": 2, "id": 12 }, { "pid": 9, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "规格管理", "belong_to": "pc", "display_name": "goods_spec_manage", "type": 2, "id": 13 }, { "pid": 0, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "店铺管理", "belong_to": "pc", "display_name": "shop_manage", "type": 1, "id": 14 }, { "pid": 14, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "店铺列表", "belong_to": "pc", "display_name": "shop_list_manage", "type": 2, "id": 15 }, { "pid": 14, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "分组管理", "belong_to": "pc", "display_name": "goods_group_manage", "type": 2, "id": 16 }, { "pid": 0, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "营销管理", "belong_to": "pc", "display_name": "market_manage", "type": 1, "id": 17 }, { "pid": 17, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "优惠券", "belong_to": "pc", "display_name": "goods_coupon_manage", "type": 2, "id": 18 }, { "pid": 17, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "每日任务", "belong_to": "pc", "display_name": "daily_task_manage", "type": 2, "id": 19 }, { "pid": 17, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "兑换红包", "belong_to": "pc", "display_name": "exchange_money_manage", "type": 2, "id": 20 }, { "pid": 17, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "活动时长", "belong_to": "pc", "display_name": "activity_time_manage", "type": 2, "id": 21 }, { "pid": 0, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "订单管理", "belong_to": "pc", "display_name": "order_manage", "type": 1, "id": 22 }, { "pid": 22, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "商品订单", "belong_to": "pc", "display_name": "goods_order_manage", "type": 2, "id": 23 }, { "pid": 22, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "活动订单", "belong_to": "pc", "display_name": "activity_order_manage", "type": 2, "id": 24 }, { "pid": 22, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "活动充值订单", "belong_to": "pc", "display_name": "activity_time_order_manage", "type": 2, "id": 25 }, { "pid": 22, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "提现账单", "belong_to": "pc", "display_name": "cash_manage", "type": 2, "id": 26 }, { "pid": 0, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "权限管理", "belong_to": "pc", "display_name": "permission_manage", "type": 1, "id": 27 }, { "pid": 27, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "权限管理", "belong_to": "pc", "display_name": "permission_list_manage", "type": 2, "id": 28 }, { "pid": 0, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "用户管理", "belong_to": "pc", "display_name": "user_manage", "type": 1, "id": 29 }, { "pid": 29, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "用户列表", "belong_to": "pc", "display_name": "user_list_manage", "type": 2, "id": 30 }, { "pid": 30, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "绑定角色", "belong_to": "pc", "display_name": "user_bind_role_manage", "type": 3, "id": 31 }, { "pid": 0, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "系统设置", "belong_to": "pc", "display_name": "sys_manage", "type": 1, "id": 32 }, { "pid": 32, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "常见问题", "belong_to": "pc", "display_name": "question_answer_manage", "type": 2, "id": 33 }, { "pid": 32, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "意见反馈", "belong_to": "pc", "display_name": "feedback_manage", "type": 2, "id": 34 }, { "pid": 32, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "日志记录", "belong_to": "pc", "display_name": "sys_log_manage", "type": 2, "id": 35 }, { "pid": 0, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "小程序管理", "belong_to": "applet", "display_name": "applet_user", "type": 1, "id": 36 }, { "pid": 36, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "审批活动", "belong_to": "applet", "display_name": "check_activity", "type": 2, "id": 37 }, { "pid": 36, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "管理员创建活动", "belong_to": "applet", "display_name": "manage_create_activity", "type": 2, "id": 38 }, { "pid": 36, "created_at": "2020-06-26T22:50:37.922499", "updated_at": "2020-06-26T22:50:37.922499", "name": "模板管理", "belong_to": "applet", "display_name": "activity_template", "type": 2, "id": 39 }], headimgurl = 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoPVya9FfbECrwNjVkuRDyE8kMIicSxVeCC2XWUsEINKScOGtbMAKlYXHUp308ibbWlibhgmYlI0Fj8g/132';
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
