import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(fb: Feedback): Observable<Feedback> {
    return this.restangular.all("feedback").post(fb);
  }
}
