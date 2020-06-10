import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AppName, UserInfo, URL, ICON, FN, URLS } from '@core/store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  userName = '';
  Permission = [];
  menus = [];
  tabs = [];
  path: any = "";
  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  selectedIndex = 0;
  @ViewChild("trigger", { static: false }) customTrigger: TemplateRef<void>;
  constructor(private location: Location, private titleService: Title, private router: Router) {
    // 设置浏览器tab文字
    this.titleService.setTitle(AppName);
    this.userName = UserInfo['name'] || '明治';
    const data = UserInfo.permission;
    data.forEach(item => {
      if (item.pid === 0) {
        let obj = {};
        obj["name"] = item["name"];
        // 将主菜单改为对应的次级菜单
        let bb = data.find(_item => _item.pid === item.id);
        obj["url"] = bb ? URLS[bb['display_name']] : URL[item["display_name"]];
        obj["icon"] = ICON[item["display_name"]];
        obj['path'] = URL[item['display_name']]
        // 区分次级菜单和特性
        // 需要修改的地方
        if (['activity_manage', 'ads_manage', 'goods_manage', 'shop_manage', 'market_manage', 'order_manage', 'permission_manage', 'user_manage', 'sys_manage'].includes(item.display_name)) {
          let ary = [];
          data.forEach(_item => {
            if (item.id === _item.pid) {
              ary.push({
                name: _item.name,
                url: URLS[_item.display_name],
                icon: ICON[_item.display_name]
              });
            }
          });
          obj["children"] = ary;
        } else {
          let o = {};
          data.forEach(_item => {
            if (item.id === _item.pid) {
              o[_item["display_name"]] = true;
            }
          });
          FN[item["display_name"]] = o;
        }
        this.menus.push(obj);
      }
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

  activate(e) {
    this.path = this.location.path();
    let data = UserInfo.permission;
    let name;
    for (let key in URL) {
      if (URL[key] == this.path) {
        name = key;
      }
    }
    for (let key in URLS) {
      if (URLS[key] == this.path) {
        name = key;
      }
    }
    if (name) {
      let a = data.find(item => item.display_name == name);
      if (!a) {
        this.router.navigateByUrl('/notfound');
      } else {
        this.router.navigateByUrl(this.path);
        if (URL[name]) {
          this.tabs = [];
        }
        if (URLS[name]) {
          let _path = this.path.split('/');
          _path.pop();
          this.tabs = this.menus.find(item => item.url.includes(_path.join('/')))['children'];
          console.log(this.tabs, this.path);
          this.tabs.forEach((item, index) => {
            if (item.url === this.path) this.selectedIndex = index;
          })
        }
      }
    } else {
      this.router.navigateByUrl('/notfound');
    }
  }

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }
}
