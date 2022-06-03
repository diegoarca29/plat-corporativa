import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fzill'
})
export class FzillPipe implements PipeTransform {

  transform(number: any, ...args: any[]): unknown {
    var numberOutput = Math.abs(number); 
    var length = number.toString().length;
    var zero = "0";
    
    if (args[0] <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(args[0] - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(args[0] - length)) + numberOutput.toString()); 
        }

    }
  }

}
