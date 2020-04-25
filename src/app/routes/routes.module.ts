import { NgModule } from '@angular/core';
import { RoutesRoutingModule } from './routes-routing.module';
import { SharedModule } from '@shared/shared.module';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  imports: [
    SharedModule,
    RoutesRoutingModule,
  ],
  declarations: [IndexComponent, LoginComponent, NotfoundComponent]
})
export class RoutesModule { }