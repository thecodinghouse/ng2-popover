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
  @Input('popoverOnClick') public popoverOnClick: boolean = false;

  constructor(private viewContainer: ViewContainerRef,private componentFactoryResolver: ComponentFactoryResolver,
  private element:ElementRef
    ) {}

  /*
   * Event listeners
   */
  
    @HostListener("click")
    toggleClick(): void {
        if (!this.popoverOnClick) return;
        this.toggle();
    }

    @HostListener("focusin")
    @HostListener("mouseenter")
    showOnHover(): void {
        if (this.popoverOnClick) return;
        this.show();
    }

    @HostListener("focusout")
    @HostListener("mouseleave")
    hideOnHover(): void {
        if (this.popoverOnClick) return;
        this.hide();
    }  

    

  /*
   * show() method to load the popoverContainer component using 'componentFactoryResolver'
   * and returns PopoverContainerComponentRef as a componentRef.
   */
  
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

  /*
   * hide() to destroys the componentRef of popoverContainer component.
   */
  hide() {
      if (!this.visible) {
        return;
      }
      this.visible = false;
      this.PopoverContainerComponentRef.destroy();
    
  }
  /*
   * toggle() toggles between show() and hide() in case of click event.
   */

  toggle(){
    if (!this.visible) {
            this.show();
        } else {
            this.hide();
        }
  }

}
