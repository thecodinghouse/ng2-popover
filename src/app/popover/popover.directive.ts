import { Directive ,HostListener, ElementRef, ComponentFactoryResolver, Input,ComponentFactory, ComponentRef ,ViewContainerRef} from '@angular/core';
import  {PopoverComponent} from './popover.component';
@Directive({
  selector: '[popover]',
 
})
export class PopoverDirective {


  private visible:boolean = false;
  private isInputComponent: boolean = false ;
  private PopoverContainerComponentRef:ComponentRef<PopoverComponent>;
 
  @Input('popover') public title:string;
  @Input('popoverContent') public content: string;
  @Input('popoverPlacement') public placement:string = "top";
  @Input('popoverComponent') public innerComponent:any;
 


  constructor(private viewContainer: ViewContainerRef,private componentFactoryResolver: ComponentFactoryResolver,
  private element:ElementRef
    ) {}

    

  /**
   * show() method to load the popoverContainer component by 'loadNextToLocation'
   * Also creates binding of PopoverOptions type to pass into popoverContainer.
   */
  @HostListener('focusin', ['$event', '$target'])
  @HostListener('mouseenter', ['$event', '$target'])
  show() {
        if (this.visible) {
          return;
        }
        this.viewContainer.clear();
        this.visible = true;
        this.isInputComponent = (this.innerComponent=== undefined)?false:true;

        let PopoverContainerComponentFactory = this.componentFactoryResolver.resolveComponentFactory(PopoverComponent);
        this.PopoverContainerComponentRef = this.viewContainer.createComponent(PopoverContainerComponentFactory);
        this.PopoverContainerComponentRef.instance.title = this.title; 
        this.PopoverContainerComponentRef.instance.content = this.content; 
        this.PopoverContainerComponentRef.instance.placement = this.placement;
        this.PopoverContainerComponentRef.instance.popoverElementRef = this.element;
        if(this.innerComponent){
       
        this.PopoverContainerComponentRef.instance.open(this.innerComponent);
         }
  
        return this.PopoverContainerComponentRef;
    }

  /**
   * hide() to dispose the componentRef of popoverContainer component
   * and also of the component loaded on popoverContainer(if exists)
   */

@HostListener('mouseleave', ['$event', '$target'])
@HostListener('focusout', ['$event', '$target'])
hide() {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    this.PopoverContainerComponentRef.destroy();
   
}








}
