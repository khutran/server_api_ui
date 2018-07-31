import { Injectable } from '@angular/core';
import { ServiceProvider } from '../service.provider';
import Category from '../../models/Category';

@Injectable()
export class CategoryService extends ServiceProvider {
  public url = '/api/v1/categories';
  public model = Category;
}
