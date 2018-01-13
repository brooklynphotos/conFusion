import { Component, OnInit, Inject } from '@angular/core';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    expand(),
    flyInOut()
  ]
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  leaderErrMsg: string;

  constructor(
    private leaderService: LeaderService,
    @Inject('ImageURL') private ImageURL
  ) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe(
      l => this.leaders = l,
      errMsg => this.leaderErrMsg = errMsg
    );
  }

}
