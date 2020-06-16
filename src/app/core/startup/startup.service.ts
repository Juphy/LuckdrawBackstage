import { Injectable } from "@angular/core";
import { UserInfo, DATA, Options } from "@core/store";
import { NzIconService } from "ng-zorro-antd";
import { ICONS } from "@core/icons/style-icons";
import { zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";

@Injectable()
export class StartupService {
  constructor(private iconService: NzIconService,
    private http: HttpClient) {
    // 初始化添加图标
    this.iconService.addIcon(...ICONS);
  }

  init(resolve, reject) {
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
    UserInfo['headimgurl'] = localStorage.getItem('headimgurl') ? localStorage.getItem('headimgurl') : '';
    UserInfo["permission"] = localStorage.getItem("permission")
      ? JSON.parse(localStorage.getItem("permission"))
      : [];
    zip(
      this.http.get('home/sys_options').pipe(map(e => e['result']))
    ).pipe(
      catchError(([err1]) => {
        reject(err1);
        return [err1]
      })
    ).subscribe(([res1]) => {
      console.log(res1);
      // option
      res1.forEach(item => {
        let type = item.type;
        switch (type) {
          case 'postage':
            Options.postage.push({
              name: item.name,
              value: item.value
            })
            Options.Postage[item.value] = item.name;
            break;
          case 'action':
            Options.action.push({
              name: item.name,
              value: item.value
            })
            Options.Action[item.value] = item.name;
            break;
          case 'feedback':
            Options.feedback.push({
              name: item.name,
              value: item.value
            })
            Options.Feedback[item.value] = item.name;
            break;
          case 'question_answer':
            Options.question_answer.push({
              name: item.name,
              value: item.value
            });
            Options.QuestionAnswer[item.value] = item.name;
            break;
          case "template":
            Options.template.push({
              name: item.name,
              value: item.value
            })
            Options.Template[item.value] = item.name;
            break;
        }
      })
    }, err => {
      reject(err);
    }, () => {
      resolve(null);
    })
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.init(resolve, reject);
    })
  }
}
