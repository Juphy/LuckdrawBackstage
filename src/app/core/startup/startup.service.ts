import { Injectable } from "@angular/core";
import { UserInfo, DATA } from "@core/store";
import { NzIconService } from "ng-zorro-antd";
import { ICONS } from "@core/icons/style-icons";
@Injectable()
export class StartupService {
  constructor(private iconService: NzIconService) {
    // 初始化添加图标
    this.iconService.addIcon(...ICONS);
  }

  load() {
    console.log("welcome!");
    DATA["TOKEN"] = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    UserInfo["name"] = localStorage.getItem("name")
      ? localStorage.getItem("name")
      : "";
    UserInfo["id"] = localStorage.getItem("id")
      ? localStorage.getItem("id")
      : "";
    UserInfo["permission"] = localStorage.getItem("permission")
      ? JSON.parse(localStorage.getItem("permission"))
      : [];
  }

  // load(): Promise<any> {
  //     return new Promise((resolve, reject) => {
  //         resolve();
  //         reject();
  //     })
  // }
}
