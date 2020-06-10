import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { GoodsComponent } from './goods/goods.component';
import { ActivityComponent } from './activity/activity.component';
import { ExchangeComponent } from './exchange/exchange.component';

const routes: Routes = [
  { path: 'goods', component: GoodsComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'exchange', component: ExchangeComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoodsComponent, ActivityComponent, ExchangeComponent]
})
export class OrderModule { }
