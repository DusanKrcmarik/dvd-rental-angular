import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})

export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      console.log(val.customer.first_name)
      if(val.name) {
      let rVal = (val.name.toLocaleLowerCase().includes(args));
      return rVal;
      } else if (val.customer.first_name || val.customer.last_name) {
        let rVal = (val.customer.first_name.toLocaleLowerCase().includes(args) || val.customer.last_name.toLocaleLowerCase().includes(args));
        return rVal;

      }
    })

  }

}