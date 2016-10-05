import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';
import { PositionService } from './position';
import { AboutComponent } from '../about/about.component';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [PositionService],
  exports: [
        PopoverComponent,
        PopoverDirective,
        
    ],
  entryComponents: [
      PopoverComponent,
      AboutComponent,

  ],

  declarations: [PopoverComponent,
                PopoverDirective]
})
export class PopoverModule { }
