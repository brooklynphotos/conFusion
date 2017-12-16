import { Injectable } from '@angular/core';
import { DISHES } from '../shared/dishes';
import { Dish } from '../shared/dish';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
    return DISHES;
  }

  getDish(id: number): Dish {
    return DISHES.filter(d => d.id === id)[0];
  }

  getFeaturedDish(): Dish {
    return DISHES.filter(d => d.featured)[0];
  }
}
