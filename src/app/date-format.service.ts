import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'dateFormat',
})

export class DateFormatService implements PipeTransform {
    transform(value: string) {
    let datePipe = new DatePipe('en-US');
    return datePipe.transform(value, 'yyyy-MM-dd');
  }
}
