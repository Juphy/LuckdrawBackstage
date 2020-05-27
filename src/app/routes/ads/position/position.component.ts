import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  data = [];
  theads = [
    { name: '广告位置名称', value: 'name' },
    { name: '广告类型', value: 'type' },
    { name: '广告位置类型', value: 'category' },
    { name: '状态', value: 'status' }
  ];
  loading = false;
  visible = false;
  constructor(
    private modalService: NzModalService,
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    this.loading = true;
    this.serverService.ads__ad_position_list().subscribe(res => {
      this.loading = false;
      if (res['status'] === 200) {
        res = res['result'];
        this.data = [...res];
      }
    })
  }

}
