import { Component, VERSION } from '@angular/core';
import { from, of, Observable } from 'rxjs';
import { tap, flatMap, delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  count = 1;
  constructor(private http: HttpClient) {
    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    .pipe(
      map(eachItem => of(eachItem))
    )
    .subscribe(data => console.log('map-->', data));
    
    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    .pipe(
      flatMap(eachItem => of(eachItem))
    )
    .subscribe(data => console.log('flatMap-->', data));

    of([1, 2], [3, 4], [5, 6], [7, 8], [9, 0])
    .pipe(
      flatMap(eachItem => eachItem)
    )
    .subscribe(data => console.log('flatMap(array)-->', data));

    of(of(1, 2), of(3, 4), of(5, 6), of(7, 8), of(9, 0))
    .pipe(
      flatMap(eachItem => eachItem)
    )
    .subscribe(data => console.log('flatMap(of())-->', data));

    of(of([1, 2]), of([3], [4]), of([5, 6]), of([7, 8]), of([9], [0]))
    .pipe(
      flatMap(eachItem => eachItem),
      flatMap(unWrappedItem => unWrappedItem)
    )
    .subscribe(data => console.log('flatMap(of([]))-->', data));

    of(of([1, 2]), [3], of(4, 5, [6, 7]), 8)
    .pipe(
      flatMap(item => {
        // console.log('complex-Processing--->', item); 
        if(item instanceof Observable) {
          return item
        } else if(item instanceof Array) {
          return item
        } else {
          return of(item);
        }
      })
    )
    .subscribe(item =>
      console.log(item)  
    ); 
    
    of([[1], [2]], [[3, 4]])
    .pipe(
      flatMap(eachItem => eachItem),
      flatMap(eachItem => eachItem)
    )
    .subscribe(data => console.log('flatMap(array(array))-->', data)); 

    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    .pipe(
      flatMap(eachItem => of(eachItem)),
      
    )
    .subscribe(data => console.log('flatMap-->', data));
    
    /*http.get<any>('https://jsonplaceholder.typicode.com/users')
    .pipe(
      tap(response => console.log('pipe-func-1-->', response)),
      flatMap((response) => response ),
      tap(response => console.log(this.count, 'pipe-func-2-->', response))
      //map(eachUser => http.get('https://jsonplaceholder.typicode.com/users/' + eachUser.id))
    ).subscribe(data =>
      console.log(this.count++, '-->', data)  
    );*/
    
  }
}
