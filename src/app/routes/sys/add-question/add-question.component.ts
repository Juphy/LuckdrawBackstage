import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';
import { ServerService, SiteInfo } from '@core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as wangEditor from "wangeditor";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html'
})
export class AddQuestionComponent implements OnInit, AfterViewInit {
  validateForm: FormGroup;
  typeOption = [];
  editor; // 富文本
  loading = false;
  @Input() data: any;
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService,
    private nzModelRef: NzModalRef,
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.get_question_type();
  }

  get_question_type() {
    this.serverService.get_question_type({ type: 'question_answer' }).subscribe(res => {
      this.typeOption = [...res];
    })
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      type: ['', [Validators.required]],
      question: ['', [Validators.required]]
    })
  }

  ngAfterViewInit() {
    if (this.data) {
      this.validateForm.get('type').setValue(this.data['type']);
      this.validateForm.get('question').setValue(this.data['question']);
      this.create_editor(this.data['answer']);
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


  make_sure() {
    let answer = this.editor.txt.html()
    if (!answer) {
      this.nzMessageService.warning('没有填写问题答案！');
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
    let params = {
      type: this.validateForm.get('type').value,
      question: this.validateForm.get('question').value,
      answer
    }
    if (this.data) params['id'] = this.data['id']
    this.loading = true;
    this.serverService.manager__edit_question_answer(params).subscribe(res => {
      this.loading = false;
      this.nzMessageService.success(this.data ? '编辑问题成功！' : '添加问题成功！');
      this.nzModelRef.destroy(true);
    }, err => {
      this.loading = false;
    })
  }

  make_cancel() {
    this.nzModelRef.destroy(false);
  }
}
