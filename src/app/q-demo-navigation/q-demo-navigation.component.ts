import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { fromEvent, Observable } from 'rxjs';
import { buffer, bufferCount, map, pluck, shareReplay } from 'rxjs/operators';
import { QDemoNavigationService } from './q-demo-navigation.service';

@Component({
  selector: 'app-q-demo-navigation',
  templateUrl: './q-demo-navigation.component.html',
  styleUrls: ['./q-demo-navigation.component.css']
})
export class QDemoNavigationComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    ngOnInit(){
      // this.demo_evenQuadrupNumbers()
      this.demo_getRandomFoods();
    }

    demo_evenQuadrupNumbers(){
      let keypress$ = fromEvent(document, 'keypress');

      let onlyNumbers$ = keypress$.pipe(
        pluck('key'),
        map((key:string) => {
          console.log(`key is ${key}`);
          let num = parseInt(key)
          if(typeof key == 'number'){
            return num
          }
          
        }
      ))
    
    console.log(buffer);
    
    let quadrupSum$ = onlyNumbers$.pipe(
      bufferCount(4),
      map( (buffer:[number]) =>{
        console.log(+buffer)
        // let sum = buffer[0] + buffer[1] + buffer[2] + buffer[3];
        // console.log(`sum is: ${sum}`);
        // return sum
      }
    ))

    let evenOdds = quadrupSum$.pipe(
      map(sum => {
        if(0%2 == 0){
          return 'even numbered quadruped detected'
        } else {
          return 'odd numbered quadruped detected'
        }
      })
    )
    
    evenOdds.subscribe(
      result => console.log(result),
      err => console.log(err),
      () => console.log('stream complete')
    )
    
    }

    demo_getRandomFoods(){
      this.service.get_Foods_e().subscribe(fruit => {
        console.log(fruit)
      })
    }
  constructor(private breakpointObserver: BreakpointObserver, private service: QDemoNavigationService) {}

}
