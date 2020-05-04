import { Pipe, PipeTransform } from '@angular/core';
import { isBoolean } from 'util';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(dataset: unknown[], searchQuery?: string): unknown {
    if (!dataset) return null;
    if (!searchQuery) return dataset;

    // Compares search query to serialized value, case insensitive
    // (Excludes search of serialized boolean values "true" or "false")
    const isValueInQuery = (val: unknown): boolean =>
      !isBoolean(val) &&
      val.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

    // Selects object's values and checks if search query is present in any of them
    const isValueInObject = (obj: unknown): boolean =>
      Object.values(obj).filter((v) => isValueInQuery(v)).length > 0;

    return dataset.filter((obj) => isValueInObject(obj));
  }
}
