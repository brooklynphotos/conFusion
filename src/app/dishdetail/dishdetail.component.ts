import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    const id = +this.route.params
      .switchMap((params: Params) => this.dishService.getDish(+params['id']))
      .subscribe(d => {
        this.dish = d;
        this.setPrevNext(d.id);
      });
  }

  setPrevNext(dishId: number) {
    const dishIndex = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + dishIndex - 1) % this.dishIds.length];
    this.next = this.dishIds[(dishIndex + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
