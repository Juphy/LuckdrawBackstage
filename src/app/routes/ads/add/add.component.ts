import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '@core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Input() id: Number = 0;
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService,
    private nzModelRef: NzModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

}
