import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  searchItems = [
    { name: '问题类型', value: 'type', type: 'number', class: "option", span: 6 }
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    type: null
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '问题类型', value: 'type' },
    { name: '问题内容', value: 'question' }
  ];
  typeObj = {};
  typeOption = [];
  constructor(
    private modelService: NzModalService,
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
  ) {
    this.get_question_type();
  }

  ngOnInit() {
    this.get_data();
  }

  get_question_type() {
    this.serverService.get_question_type({ type: 'question_answer' }).subscribe(res => {
      this.typeOption = [...res];
      this.typeOption.forEach(item => {
        this.typeObj[item.value] = item.name;
      })
    })
  }

  get_data(flag?: boolean) {
    if (flag) this.searchData.page = 1;
    let params = {
      page: this.searchData.page,
      pagesize: this.searchData.pagesize
    };
    this.searchItems.forEach(item => {
      let value = item.value;
      if (this.searchData[value]) params[value] = this.searchData[value];
    })
    this.loading = true;
    this.serverService.manager__question_answers(params).subscribe(res => {
      this.loading = false;
      if (res['status'] === 200) {
        res = res['result'];
        this.data = res['data'];
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
      type: null
    }
    this.get_data();
  }

  show_modal(data?) {
    const modal = this.modelService.create({
      nzTitle: data ? '编辑问题' : '添加问题',
      nzContent: AddComponent,
      nzFooter: null,
      nzComponentParams: {
        data
      },
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 1080
    });
    modal.afterClose.subscribe(res => {
      if (res) this.get_data();
    })
  }
}
