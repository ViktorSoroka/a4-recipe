import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app.routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
