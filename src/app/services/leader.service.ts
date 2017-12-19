import { Injectable } from '@angular/core';

import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders() {
    return LEADERS;
  }

  getFeaturedLeader(): Leader {
    return LEADERS.filter(l => l.featured)[0];
  }
}
