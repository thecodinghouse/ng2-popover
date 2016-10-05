import { Component, Input, ElementRef, AfterViewChecked, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, ViewChild} from '@angular/core';
import {PositionService} from './position';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements AfterViewChecked {
  public title: string;
  public content: any;
  public placement: string;
  public top:string = '-1000px';
  public left:string = '-1000px';
  public display:string = 'block';
  private classMap: any;
  private visible: boolean = true;
  public popoverElementRef: any;
  public innerComponent: any;
  private isInputComponent: boolean;
  private DynamicComponentFactoryRef: any;


  @ViewChild('child', { read: ViewContainerRef })
  private dynamicRef: any;


  constructor(private positionService: PositionService, private element: ElementRef, private viewContainer: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {

  }

  setStyles() {
    let styles = {
      // CSS property names
      top: this.top,
      left: this.left,
      display: this.display
    };
    return styles;
  }



  /**
   * A method to get the position of popover by calculating top and left with
   * respect to host and target element.
   */
  public position(hostEl: ElementRef, targetEl: ElementRef) {
     
    let p = this.positionService
      .positionElements(hostEl.nativeElement,
      targetEl.nativeElement.children[0],
      this.placement, true);

    this.top = p['top'] + 'px';
    this.left = p['left'] + 'px';
    this.classMap = { 'in': true, 'fade': true };
    this.classMap[this.placement] = true;

  }

  public open(DynamicComponent) {
    let DynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    this.DynamicComponentFactoryRef = this.dynamicRef.createComponent(DynamicComponentFactory);

  }

  ngAfterViewChecked() {
    if (this.visible) {
      setTimeout(() => {
        this.visible = false;

        this.position(this.popoverElementRef, this.element);
      }, '100')
    }
  }


  ngOnDestroy() {
    // If we have a component, make sure we destroy it when we lose its owner
    if (this.DynamicComponentFactoryRef) {
      this.DynamicComponentFactoryRef.destroy();
    }

  }
}


