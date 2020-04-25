import { Component, OnInit, Input, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService, NzModalRef, isTemplateRef } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { DATA, ServerService, SiteInfo } from '@core';
import { Send_Type } from '@routes/DATA';
import * as wangEditor from "wangeditor";

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html'
})
export class BuildComponent implements OnInit, AfterViewInit {
  validateForm: FormGroup;
  fileList = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  uploading = false;
  CategoryList = [];
  GroupList = [];
  SendTypeList = [...Send_Type];
  editor;
  loading = false;
  @Input() id: number = 0; // 产品id
  constructor(private http: HttpClient,
    private server: ServerService,
    private nzMessageService: NzMessageService,
    private nzModelRef: NzModalRef,
    private fb: FormBuilder,
    private el: ElementRef) {
    this.get_group_list();
    this.get_category_list();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ["", [Validators.required]],
      category_id: [null, [Validators.required]],
      groups: [null, [Validators.required]],
      description: ["", [Validators.required]],
      send_type: [0, [Validators.required]],
    })
  }

  ngAfterViewInit() {
    if (this.id) {
      this.server.goods__spu_info({ id: this.id }).subscribe(res => {
        if (res['status'] === 200) {
          res = res['result'];
          this.validateForm.get('name').setValue(res['goods_name']);
          this.validateForm.get('category_id').setValue(res['category_id']);
          this.validateForm.get('groups').setValue(JSON.parse(res['groups']));
          this.validateForm.get('description').setValue(res['description']);
          this.validateForm.get('send_type').setValue(res['send_type']);
          let images = JSON.parse(res['images']);
          images = images.map((item, index) => {
            return {
              uid: index,
              name: index + '.' + item.split('.').pop(),
              status: 'done',
              url: item
            }
          })
          this.fileList = [...images];
          this.create_editor(res['introduce']);
        }
      })
    } else {
      this.create_editor();
    }
  }

  create_editor(data?) {
    let editorDom = this.el.nativeElement.querySelector('#rule');
    this.editor = new wangEditor(editorDom);
    this.editor.customConfig.uploadImgServer = SiteInfo.api + "/ucs/upload_img";
    this.editor.customConfig.uploadFileName = "img_path";
    this.editor.customConfig.customAlert = function (info) {
      // info 是需要提示的内容
      alert('自定义提示：' + info)
    }
    this.editor.customConfig.uploadImgHooks = {
      // before: (xhr, editor, files) => {
      //   console.log(xhr, editor, files);
      // },
      success: (xhr, editor, result) => {
        this.nzMessageService.success('图片上传成功！')
      },
      customInsert: (insertImg, result, editor) => {
        let path = result['result'];
        insertImg(path);
      }
    };
    this.editor.create();
    if (data) this.editor.txt.html(data);
  }

  // 预览图片
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  beforeUpload = (file, files): boolean => {
    console.log(file);
    let fileList = [...this.fileList];
    this.fileList = [...fileList, {
      uid: file.uid,
      name: file.name,
      status: 'uploading',
    }];
    let formData = new FormData();
    formData.append('img_path', file);
    this.uploading = true;
    this.http.post('ucs/upload_img', formData).subscribe(res => {
      this.uploading = false;
      if (res['status'] === 200) {
        this.fileList = [...fileList, {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: res['result']
        }]
      } else {
        this.fileList = [...fileList];
      }
    }, err => {
      this.fileList = [...fileList];
      this.uploading = false;
    })
    return false;
  }

  get_group_list() {
    this.server.goods__category_list({}).subscribe(res => {
      this.CategoryList = res['result'];
    })
  }

  get_category_list() {
    this.server.goods__group_list({}).subscribe(res => {
      this.GroupList = res['result'];
    })
  }

  make_sure() {
    if (!this.fileList.length) {
      this.nzMessageService.warning('没有添加商品图片！');
      return;
    }
    let introduce = this.editor.txt.html()
    if (!introduce) {
      this.nzMessageService.warning('没有填写商品详情！');
      return;
    }
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
    let images = [];
    this.fileList.forEach(item => images.push(item.url));
    let params = {
      name: this.validateForm.get('name').value,
      groups: this.validateForm.get('groups').value,
      category_id: this.validateForm.get('category_id').value,
      description: this.validateForm.get('description').value,
      send_type: this.validateForm.get('send_type').value,
      images,
      introduce
    };
    if (this.id) params['id'] = this.id;
    this.loading = true;
    this.server.goods__edit_spu(params).subscribe(res => {
      this.loading = false;
      this.nzMessageService.success(this.id ? '编辑商品成功！' : '添加商品成功！');
      this.nzModelRef.destroy(true);
    }, err => {
      this.loading = false;
    })

  }

  make_cancel() {
    this.nzModelRef.destroy(false);
  }
}
