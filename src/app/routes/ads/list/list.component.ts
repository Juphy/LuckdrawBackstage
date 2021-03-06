import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { AddComponent } from '../add/add.component';
import { UrlType } from '@routes/DATA';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
  searchItems = [
    { name: '广告名称', value: 'name', type: 'text', class: "input", span: 6 }
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    name: ''
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '广告名称', value: 'name' },
    { name: '广告图片', value: 'image' },
    { name: '广告位置', value: 'position_id' },
    { name: '广告主', value: 'advertiser_id' },
    { name: '计费方式', value: 'billing_method' },
    { name: '广告跳转网站名称', value: 'url_name' },
    { name: '广告跳转类型', value: 'url_type' },
    { name: '广告跳转链接', value: 'url_path' },
    { name: '有效日期', value: 'date' },
    { name: '价格（元）', value: 'price' },
    { name: '状态', value: 'status' },
  ];
  positionObj = {};
  advertiserOption = [];
  advertiserObj = {};
  billingMethod = {
    1: 'CPM',
    2: 'CPC',
    3: 'CPT'
  };
  statusObj = {
    0: '无效',
    1: '有效'
  };
  adUrlObj = { ...UrlType };
  constructor(
    private modelService: NzModalService,
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
  ) {
    this.message.getAdList().subscribe(res => {
      if (res) this.searchData = { ...res };
    })
    this.get_adposition();
    this.get_advertiser();
  }

  get_advertiser() {
    this.serverService.ads__advertiser_list({}).subscribe(res => {
      if (res.status === 200) {
        this.advertiserOption = res['result'];
        this.advertiserOption.forEach(item => {
          this.advertiserObj[item.id] = item.name;
        })
      }
    })
  }

  ngOnInit() {
    this.get_data();
  }

  ngOnDestroy(): void {
    this.message.setAdList(this.searchData);
  }

  get_adposition() {
    this.serverService.ads__ad_position_list().subscribe(res => {
      if (res['status'] === 200) {
        res['result'].forEach(item => {
          this.positionObj[item.id] = item.name;
        })
      }
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
    this.serverService.ads__list(params).subscribe(res => {
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
      name: ''
    }
    this.get_data();
  }

  show_modal(id?) {
    const modal = this.modelService.create({
      nzTitle: id ? '广告详情' : '添加广告',
      nzContent: AddComponent,
      nzFooter: null,
      nzComponentParams: {
        id
      },
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 960
    });
    modal.afterClose.subscribe(res => {
      if (res) this.get_data();
    })
  }

  delete_ad(id) {
    this.serverService.ads__del_ads({ id }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('广告删除成功！');
        this.get_data();
      }
    })
  }

  cancel() {

  }

  change_status(id, status) {
    this.serverService.ads__change_status({ id, status }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('广告状态修改成功！');
        this.get_data();
      }
    })
  }
}
