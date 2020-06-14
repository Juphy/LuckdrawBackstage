import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  searchItems = [
    { name: '用户昵称', value: 'nickname', type: 'text', class: "input", span: 6 },
    { name: '真实姓名', value: 'realname', type: 'text', class: "input", span: 6 },
    { name: '性别', value: 'sex', type: 'text', class: "option", span: 6 },
    { name: '联系电话', value: 'phone', type: 'text', class: "input", span: 6 },
    { name: '店铺ID', value: 'shop_id', type: 'number', class: "number", span: 6 },
    { name: '店铺名称', value: 'shop_name', type: 'text', class: "input", span: 6 },
    { name: '管理员？', value: 'is_manager', type: 'text', class: "option", span: 6 },
    { name: '特殊人员？', value: 'is_special', type: 'text', class: "option", span: 6 },
    { name: '余额（元）', value: 'balance', type: 'number', class: "number", span: 6 },
    { name: '幸运币', value: 'point', type: 'number', class: "number", span: 6 },
    { name: '关注服务号?', value: 'attention_service', type: 'number', class: "option", span: 6 },
    { name: '关注小程序?', value: 'attention_applet', type: 'number', class: "option", span: 6 },
    { name: '参与次数', value: 'joined_count', type: 'number', class: "number", span: 6 },
    { name: '关注时间', value: 'date', type: 'text', class: "date", span: 8 },
  ];
  loading = false;
  searchData: any = {
    page: 1,
    pagesize: 16,
    nickname: '',
    realname: '',
    sex: null,
    phone: '',
    shop_id: '',
    shop_name: '',
    is_manager: null,
    is_special: null,
    min_balance: '',
    max_balance: '',
    min_point: '',
    max_point: '',
    attention_service: null,
    attention_applet: null,
    joined_count: '',
    date: null
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '用户昵称', value: 'nickname' },
    { name: '真实姓名', value: 'realname' },
    { name: '性别', value: 'sex' },
    { name: '联系电话', value: 'phone' },
    { name: '余额（元）', value: 'balance' },
    { name: '幸运币', value: 'point' },
    { name: '参与次数', value: 'joined_count' },
    { name: '店铺ID', value: 'shop_id' },
    { name: '店铺名称', value: 'shop_name' },
    { name: '管理员？', value: 'is_manager' },
    { name: '特殊人员？', value: 'is_special' },
    { name: '关注服务号？', value: 'attention_service' },
    { name: '关注小程序？', value: 'attention_applet' },
    { name: '关注时间', value: 'created_at' },
  ];
  sexOption = [
    { name: '男', value: 1 },
    { name: '女', value: 2 }
  ];
  sexObj = {
    1: '男', 2: '女'
  };
  attentionServiceOption = [
    { name: '已关注', value: 1 },
    { name: '未关注', value: 0 }
  ];
  attentionServiceObj = {
    1: '已关注',
    0: '未关注'
  };
  attentionAppletOption = [
    { name: '已关注', value: 1 },
    { name: '未关注', value: 0 }
  ];
  attentionAppletObj = {
    1: '已关注',
    0: '未关注'
  };
  isSpecialOption = [
    { name: '是', value: 1 },
    { name: '否', value: 0 }
  ];
  isSpecialObj = {
    1: '是',
    0: '否'
  };
  isManagerOption = [
    { name: '是', value: true },
    { name: '否', value: false }
  ];
  formatterBalance = (value: number) => value ? value.toFixed(2) : value;
  constructor(
    private modelService: NzModalService,
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
  ) {
    this.message.getRoleList().subscribe(res => {
      if (res) this.searchData = { ...res };
    })
  }

  ngOnInit() {
    this.get_data();
  }

  get_data(flag?: boolean) {
    if (flag) this.searchData.page = 1;
    let params = {
      page: this.searchData.page,
      pagesize: this.searchData.pagesize
    };
    this.searchItems.forEach(item => {
      let value = item.value, param = this.searchData[value];
      switch (value) {
        case 'is_manager':
          if (param === true || param === false) params[value] = param; 
          break;
        case 'date':
          if (param && param[0]) params['start_created_at'] = formatDate(param[0], 'yyyy-MM-dd HH:mm:ss', 'en-US');
          if (param && param[1]) params['end_created_at'] = formatDate(param[1], 'yyyy-MM-dd HH:mm:ss', 'en-US');
          break;
        default:
          if (['attention_service', 'attention_applet', 'is_special'].includes(value)) {
            if (param === 0 || param === 1) params[value] = param
          } else {
            if (param) params[value] = param;
          }
          break;
      }
    })
    this.loading = true;
    this.serverService.manager__user_list(params).subscribe(res => {
      this.loading = false;
      if (res['status'] === 200) {
        res = res['result'];
        this.data = res['data'];
        this.data.forEach(item => {
          item['sex'] = this.sexObj[item.sex];
          item['balance'] = item['balance'] ? item['balance'].toFixed(2) : item['balance'];
          item['created_at'] = formatDate(item['created_at'] * 1000, 'yyyy-MM-dd HH:mm:ss', 'en-US')
        })
        this.total = res['pageinfo']['total'];
      }
    }, err => {
      this.loading = false;
    })
  }

  clear_data() {
    this.searchData = {
      page: 1,
      pagesize: this.searchData.pagesize,
      nickname: '',
      realname: '',
      sex: null,
      phone: '',
      shop_id: '',
      shop_name: '',
      is_manager: null,
      is_special: null,
      min_balance: '',
      max_balance: '',
      min_point: '',
      max_point: '',
      attention_service: null,
      attention_applet: null,
      joined_count: '',
      date: null
    }
    this.get_data();
  }
}
