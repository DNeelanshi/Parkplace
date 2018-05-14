import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditlistingPage } from './editlisting';

@NgModule({
  declarations: [
    EditlistingPage,
  ],
  imports: [
    IonicPageModule.forChild(EditlistingPage),
  ],
})
export class EditlistingPageModule {}
