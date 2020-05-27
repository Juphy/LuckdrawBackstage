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
  @ViewChild("trigger", { static: false }) customTrigger: TemplateRef<void>;
  constructor(private location: Location, private titleService: Title, private router: Router) {
    // 设置浏览器tab文字
    this.titleService.setTitle(AppName);
    this.userName = UserInfo['name'] || '明治';
    const data = UserInfo.permission;
    data.forEach(item => {
      if (item.pid === 0) {
        let obj = {};
        obj["name"] = item["display_name"];
        // 将主菜单改为对应的次级菜单
        let bb = data.find(_item => _item.pid === item.id);
        obj["url"] = bb ? URLS[bb['name']] : URL[item["name"]];
        obj["icon"] = ICON[item["name"]];
        obj['path'] = URL[item['name']]
        // 区分次级菜单和特性
        // 需要修改的地方
        if (['main', 'market','ads'].includes(item.name)) {
          let ary = [];
          data.forEach(_item => {
            if (item.id === _item.pid) {
              ary.push({
                name: _item.display_name,
                url: URLS[_item.name],
                icon: ICON[_item.name]
              });
            }
          });
          obj["children"] = ary;
        } else {
          let o = {};
          data.forEach(_item => {
            if (item.id === _item.pid) {
              o[_item["name"]] = true;
            }
          });
          FN[item["name"]] = o;
        }
        this.menus.push(obj);
      }
    });
    console.log(this.menus);
  }

  ngOnInit() { }

  activate(e) {
    this.path = this.location.path();
    console.log(this.path);
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
      let a = data.find(item => item.name == name);
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
