import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkinglistPage } from './parkinglist';

@NgModule({
  declarations: [
    ParkinglistPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkinglistPage),
  ],
})
export class ParkinglistPageModule {}
