import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'categoryFilter'
})

export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      console.log(val.name)
      let rVal = (val.name.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}