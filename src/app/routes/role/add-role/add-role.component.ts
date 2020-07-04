import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServerService, Options } from '@core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzFormatEmitEvent, NzTreeNodeOptions, NzTreeNode } from 'ng-zorro-antd/core';
import { NzTreeComponent } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
})
export class AddRoleComponent implements OnInit {
  validateForm: FormGroup;
  Options = [];
  btnLoading = false;

  defaultCheckedKeys = [];
  defaultSelectedKeys = [];
  defaultExpandedKeys = [];
  nodes: NzTreeNodeOptions[] = [];

  flag = true;
  @Input() data: any;
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent: NzTreeComponent;
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService,
    private nzModelRef: NzModalRef,
    private fb: FormBuilder
  ) {
    this.serverService.role__permissions().subscribe(res => {
      this.Options = [...res];
      let data1 = res.filter(item => item.pid === 0);
      this.defaultExpandedKeys = data1.map(item => item.id.toString());
      this.nodes = [];
      data1.forEach(item => {
        let children = res.filter(_item => _item.pid === item.id);
        children = children.map(child => {
          let obj = {
            title: child.name,
            key: child.id.toString(),
            selectable: false,
            level: 1
          };
          let _children = res.filter(_child => _child.pid === child.id).map(a => {
            return {
              title: a.name,
              key: a.id.toString(),
              isLeaf: true,
              selectable: false
            }
          })
          if (_children.length) {
            _children.unshift({
              title: '默认',
              key: child.id.toString(),
              isLeaf: true,
              selectable: false,
              level: 2
            })
            obj['key'] = '_' + obj['key'];
            obj['children'] = _children;
            obj['expanded'] = true;
          } else {
            obj['isLeaf'] = true;
          }
          return obj;
        })
        this.nodes = this.nodes.concat({
          title: item.name,
          key: item.id.toString(),
          expanded: true,
          selectable: false,
          children,
          level: 0
        })
      })
    })
  }

  make_click(event: NzFormatEmitEvent) {
    event.node.origin.checked = !event.node.isChecked;
  }

  nzEvent(event: NzFormatEmitEvent): void {
    this.nodes.forEach(item => {
      item['selected'] = false;
      item.children.forEach(child => {
        if (child.children && child.children.length) {
          if (child.children.some(a => a.checked === true)) {
            child.children[0]['checked'] = true;
          }
          if (child.children.every(a => a.checked === true)) {
            child['checked'] = true;
          }
        }
      })
    })
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      permissions: [null]
    });
    if (this.data) {
      this.serverService.role__info({ id: this.data.id }).subscribe(res => {
        res = res['result'];
        this.validateForm.get('name').setValue(res.name);
        this.validateForm.get('permissions').setValue(res.permissions.map(item => item.id.toString()));
        this.defaultCheckedKeys = this.validateForm.get('permissions').value;
      })
    }
  }

  make_cancel() {
    this.nzModelRef.destroy(false);
  }

  make_sure() {
    let flag = false;
    for (const i in this.validateForm.controls) {
      let control = this.validateForm.controls[i];
      control.markAsDirty();
      control.updateValueAndValidity();
      if (control.errors && control.errors['required']) {
        if (!control.value) flag = true;
      }
    }
    if (flag) return;
    let permissions = [];
    this.nodes.forEach(node => {
      let children = node['children'];
      children.forEach(item => {
        if (item.children && item.children.length) {
          item.children.forEach(child => {
            if (!permissions.includes(child.key) && child.checked) permissions.push(child.key)
          })
        } else {
          if (item.checked) {
            if (!permissions.includes(item.key) && item.checked) permissions.push(item.key)
          }
        }
      })
      if (children.some(item => item.checked)) permissions.push(node.key);
    })
    permissions = permissions.map(item => Number(item));
    if (!permissions.length) {
      this.nzMessageService.warning('没有选择权限！');
      return;
    }
    let params: any = {
      name: this.validateForm.get('name').value,
      permissions
    };
    this.btnLoading = true;
    if (!this.data) {
      this.serverService.role__add(params).subscribe(res => {
        this.btnLoading = false;
        if (res.status === 200) {
          this.nzMessageService.success('角色添加成功！');
          this.nzModelRef.destroy(true);
        }
      }, err => {
        this.btnLoading = false;
      })
    } else {
      params['id'] = this.data.id;
      this.serverService.role__edit(params).subscribe(res => {
        this.btnLoading = false;
        if (res.status === 200) {
          this.nzMessageService.success('角色编辑成功！');
          this.nzModelRef.destroy(true);
        }
      }, err => {
        this.btnLoading = false;
      })
    }

  }
}
