import { Component, OnInit } from '@angular/core';
import { ServerService, MessageService } from '@core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html'
})
export class TemplateComponent implements OnInit {
  searchItems = [
    { name: '模板名称', value: 'template_name', type: 'text', class: "input", span: 6 },
    { name: '模板类型', value: 'template_type', type: 'text', class: "input", span: 6 }
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    template_name: '',
    template_type: null
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '模板名称', value: 'template_name' },
    { name: '模板类型', value: 'template_type' }
  ];
  constructor(
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
  ) {
    this.message.getTemplateList().subscribe(res => {
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
      let value = item.value;
      if (this.searchData[value]) params[value] = this.searchData[value];
    })
    this.loading = true;
    this.serverService.activity__template_list(params).subscribe(res => {
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
      template_name: '',
      template_type: null
    };
    this.get_data();
  }

  // 删除模板
  del_template(id) {
    this.serverService.activity__del_template({ id }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('模板删除成功！');
        this.get_data();
      }
    })
  }

}
