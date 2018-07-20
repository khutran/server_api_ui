import { Pipe, PipeTransform } from '@angular/core';
import Location from '../../../models/Location';
import Product from '../../../models/Product';
import * as _ from 'lodash';
import BulkGroup from '../../../models/BulkGroup';
import Destination from '../../../models/Destination';

@Pipe({
  name: 'groupByBulk'
})
export class GroupByBulkPipe implements PipeTransform {
  transform(items: any[], destinations: Destination[]): any[] {
    let group = [];
    for (const item of items) {
      if (item.data instanceof Location) {
        const new_group = new BulkGroup({
          location: item.data,
          code: item.code,
          products: []
        });
        group.push(new_group);
      } else if (item.data instanceof Product) {
        const last_group = _.last(group);
        if (!_.isUndefined(last_group)) {
          let product = item.data;
          let des = _.find(destinations, i => i.getId() === last_group.location.destination.getId());
          if (!_.isUndefined(des)) {
            product = _.assign(product, { destination: des, destination_id: des.getId() });
            let loc = _.find(des.locations, i => i.getId() === last_group.location.getId());
            if (!_.isUndefined(des)) {
              product = _.assign(product, { location: loc, location_id: loc.getId() });
            }
          }
          last_group.products.push(product);
        }
      }
    }
    return group;
  }
}
