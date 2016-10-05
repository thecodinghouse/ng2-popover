import { Component, ComponentFactoryResolver,ComponentFactory, ComponentRef ,ViewContainerRef } from '@angular/core';
import {AboutComponent} from './about/about.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  constructor(
  
    ) {}

    getDynamicInput(){  
    return AboutComponent;
}
}
