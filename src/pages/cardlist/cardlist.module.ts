import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardlistPage } from './cardlist';

@NgModule({
  declarations: [
    CardlistPage,
  ],
  imports: [
    IonicPageModule.forChild(CardlistPage),
  ],
})
export class CardlistPageModule {}
