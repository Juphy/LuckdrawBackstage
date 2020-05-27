import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from '@layout/layout.component';
import { IndexComponent } from './index/index.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'console',
    component: LayoutComponent,
    children: [
      // 产品管理
      { path: "main", loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
      // 营销管理
      { path: "market", loadChildren: () => import('./market/market.module').then(m => m.MarketModule) },

      { path: "ads", loadChildren: () => import('./ads/ads.module').then(m => m.AdsModule) },

      { path: 'notfound', component: NotfoundComponent },
      { path: '**', redirectTo: 'notfound' }
    ]
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, environment.production ? { preloadingStrategy: PreloadAllModules } : {})], //  预加载所有路由
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {
}
