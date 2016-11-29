

## An Angular2 popover component with bootstrap presets  

**```ng2-popover```**  provides angular 2 popover using bootstrap css.

In addition to a simple popover with a title and content, **```ng2-popover```** can also dynamically load a component on popover.

### Popover properties

  - `popover` (`string`) - Text to be displayed as title 
  - `popoverPlacement` (`?string='top'`) - Popover positioning instruction, supported positions: 'top', 'bottom', 'left', 'right'
  - `popoverContent` (`?string`) - Text to be displayed as  content
  - `popoverComponent` (`?getPopoverComponent()`) - Binds `popoverComponent` to the response of method `getPopoverComponent()`
  - `popoverOnClick` (`?boolean`) - Show popover on click
  
  
### Demo 
To run the demo locally follow these steps :

        git clone https://github.com/tixdo/ng2-popover.git  
        npm install  
        typings install  
        webpack-dev-server // development, webpack -p to build.  
        browse to localhost:4200    

### Usage

Import **```PopoverModule```** and add in your module's imports.

```typescript
import { PopoverModule } from './ng2-popover/popover.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PopoverModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

- **A simple popover with a title and content**
   
 For a simple popover add follwing popover properties on a DOM element.

   `popover`=" text for Popover title"

   `popoverContent`="text for Popover content " 
   
   `popoverPlacement`="position"

 In given example a popover will be displayed on a input tag.

``` html
   <input type="text" value="hover on me!" popover=" Popover title"
        popoverContent=" Popover content " popoverPlacement="bottom" class="form-control" />
      
  ```
  

- **A popover with a dyanamic component as content**
   
 For loading a component dynamically on popover add follwing popover properties on a DOM element.

   `popover`= " text for Popover title"

   `[popoverComponent]` = "getDynamicInput()"
   
   `popoverPlacement`="position"
   
   `getPopoverComponent()` is a method which returns a component that will be loaded on popover.
    
    > Note : import the component to be loaded and include in module's imports.
    
In the example given below a popover will be displayed on a anchor tag with a dynamic component
  
`About` as content. 
            app.component.ts :
  ```typescript
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
```
app.html :
    
 ``` html
   <a class="col-xs-6" popover="Popover with dynamic component " 
   popoverPlacement="top" [popoverComponent]="getDynamicInput()"> 
   Hover to load dynamic component on poppver </a>                      
      
  ```
### Reference
 - https://github.com/valor-software/ng2-bootstrap
