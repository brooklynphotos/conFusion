import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    expand(),
    flyInOut()
  ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  dishErrMsg: string;
  promotion: Promotion;
  promotionErrMsg: string;
  leader: Leader;
  leaderErrMsg: string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('ImageURL') private ImageURL
  ) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        errMsg => this.dishErrMsg = errMsg
      );
    this.promotionService.getFeaturedPromotion()
    .subscribe(
      p => this.promotion = p,
      errMsg => this.promotionErrMsg = errMsg
    );
    this.leaderService.getFeaturedLeader()
    .subscribe(
      l => this.leader = l,
      errMsg => this.leaderErrMsg = errMsg
    );
  }

}
