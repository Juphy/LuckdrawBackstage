import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { NZ_I18N, zh_CN as zorroLang } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { default as ngLang } from '@angular/common/locales/zh';
import { AppRoutingCache } from './app-routing.cache';

const LANG = {
  abbr: 'zh',
  ng: ngLang,
  zorro: zorroLang
};
// register angular
import { registerLocaleData } from '@angular/common';
registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  { provide: LOCALE_ID, useValue: LANG.abbr },
  { provide: NZ_I18N, useValue: LANG.zorro }
];

import { DefaultInterceptor, StartupService } from '@core';
export function StartupServiceFactory(
  startupService: StartupService,
): Function {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { SharedModule } from '@shared';
import { LayoutModule } from '@layout/layout.module';
import { RoutesModule } from '@routes/routes.module';
import { CoreModule } from '@core/core.module';

const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // { provide: LocationStrategy, useClass: PathLocationStrategy },  // 使用Html5路由
    { provide: RouteReuseStrategy, useClass: AppRoutingCache },   // 实现路由缓存
    ...LANG_PROVIDES,
    ...INTERCEPTOR_PROVIDES,
    ...APPINIT_PROVIDES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
