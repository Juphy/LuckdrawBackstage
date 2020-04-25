import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
const COMPONENTS = [];

const DIRECTIVES = [];

const THIRDMODULES = [
  NgZorroAntdModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...THIRDMODULES
  ],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...THIRDMODULES,
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  entryComponents: []
})
export class SharedModule { }
