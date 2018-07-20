import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { config } from '../../../../environments/config';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let format = config.dateFormat;
    let m = moment(value).format(format);
    return m;
  }

}
