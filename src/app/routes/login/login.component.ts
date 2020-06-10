import { Component, OnInit } from '@angular/core';
import { DATA, UserInfo, URL } from "@core/store";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ServerService } from '@core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,
    private router: Router,
    private server: ServerService) { }

  ngOnInit() {
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


    let data = {
      token: '1234567890',
      user_info: {
        name: '文字',
        id: 1,
        roles: [
          {
            id: 1,
            name: '超级管理员',
            status: 0
          }
        ],
      },
      permission_list: [
        { id: 1, pid: 0, name: 'main', display_name: '产品管理', description: "1" },
        { id: 11, pid: 1, name: 'main_list', display_name: '商品列表', description: "2" },
        { id: 12, pid: 1, name: 'category', display_name: '商品分类', description: "2" },
        { id: 13, pid: 1, name: 'group', display_name: '商品分组', description: "2" },
        { id: 2, pid: 0, name: 'market', display_name: '营销管理', description: "1" },
        { id: 21, pid: 2, name: 'coupon', display_name: '优惠券管理', description: "2" },
        // { id: 22, pid: 2, name: 'ad', display_name: '广告管理', description: "2" },
        { id: 3, pid: 0, name: 'ads', display_name: '广告管理', description: "1" },
        { id: 31, pid: 3, name: 'ads_list', display_name: '广告列表', description: "2" },
        { id: 32, pid: 3, name: 'ads_position', display_name: '广告位置', description: "2" },
        { id: 4, pid: 0, name: 'question', display_name: '问题管理', description: "1" },
        { id: 41, pid: 4, name: 'question_list', display_name: '问题列表', description: "2" }
      ]
    };

  }

}
