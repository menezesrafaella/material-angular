export const FOOD_LIST = [ 
  "apple", "meal", "pineapple", "strawberry"
]

import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import * as _ from 'undercore'


@Injectable({
  providedIn: 'root'
})
export class QDemoNavigationService {

  getFruits():Observable<any>{
    let fruits = ["apple", "pineapple", "strawberry"];

    let fruit$= interval(2000)
    .pipe( map ( time => `have a fruit: ${ time}`))
    return fruit$
  }

  get_Foods_e():Observable<any>{
    return Observable.create( observer => {
      let index = 0

      setInterval( ()=> {
        let nextFood = FOOD_LIST[index]
        if(nextFood){
          observer.next(nextFood)
          index++;
        }else{
          observer.error(new Error("Array access error"))
        }
      }, 1000)
    })
    .pipe(catchError ( err => {
      console.log('there is some error with the observable')
      return FOOD_LIST
    }))
  }

  constructor() { }
}
