import { Component } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    let now = moment(); // add this 2 of 4
    console.log(now.add(7, 'days').format()); // add this 4of 4
  }
}
