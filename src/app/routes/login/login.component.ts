import { Component, OnInit, OnDestroy } from '@angular/core';
import { DATA, UserInfo, URL } from "@core/store";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ServerService } from '@core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder) {
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

  ngOnInit() {
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
    this.server.wechat__get_service_user_info({}).subscribe(res => {
      if (res.status === 200) {
        res = res['result'];
        let { id, nickname, roles, permissions } = res;
        permissions = permissions.filter(item => item.belong_to === 'pc')
        UserInfo['id'] = id;
        UserInfo['name'] = nickname;
        UserInfo['roles'] = roles;
        UserInfo['permission'] = permissions;

        // localStorage存储信息
        localStorage.setItem('name', nickname);
        localStorage.setItem('id', id.toString());
        localStorage.setItem('permission', JSON.stringify(permissions));
        this.router.navigateByUrl('/index');
      }
    })
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

  flag = true; //true 普通登录  false扫码登录
  change_flag() {
    this.flag = !this.flag;
    if (!this.flag) {
      // 获取二维码
    }
  }

  erweima = "assets/erweima.jpg";
  imgLoading = true;

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
