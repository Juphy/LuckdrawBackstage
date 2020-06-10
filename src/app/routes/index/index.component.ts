import { Component, OnInit } from '@angular/core';
import { UserInfo, URL, URLS } from '@core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  isLogin = false;
  userName = '孔明';
  path = '';

  constructor() {
    if (UserInfo.id && UserInfo.name) {
      this.isLogin = true;
      this.userName = UserInfo.name;
      let a = UserInfo['permission'].find(item => item.type == 1);
      let b = UserInfo['permission'].find(item => item.pid == a.id);
      this.path = b ? URLS[b['display_name']] : URL[a['display_name']];
    }
  }

  ngOnInit() {
  }

  login() {

  }

  console() {

  }
}
