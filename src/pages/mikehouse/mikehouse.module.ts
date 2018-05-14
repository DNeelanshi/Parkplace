import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MikehousePage } from './mikehouse';

@NgModule({
  declarations: [
    MikehousePage,
  ],
  imports: [
    IonicPageModule.forChild(MikehousePage),
  ],
})
export class MikehousePageModule {}
