import { Component, OnInit, Inject } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import {Comment} from '../shared/comment';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  commentForm: FormGroup;
  dish: Dish;
  dishcopy = null;
  errMsg: string;
  dishIds: number[];
  prev: number;
  next: number;
  preview: Comment;
  readonly minLength = 2;
  readonly maxLength = 80;

  readonly formErrors  = {
    author: '',
    comment: ''
  };

  readonly validationMessages = {
    author: {
      'required': 'Your name is required.',
      'minlength':  `Your name must be at least ${this.minLength} characters long.`,
      'maxlength':  `Your name cannot be more than ${this.maxLength} characters long.`
    },
    comment: {
      required: 'Comment is required.'
    }
  };

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('ImageURL') private ImageURL
  ) {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(this.onValueChanged.bind(this));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    const f = this.commentForm;
    if (!f) { return; }
    if (f.pristine) { return; }
    Object.keys(this.formErrors).forEach(field => {
      this.formErrors[field] = '';
      const control = f.get(field);
      if (control && control.dirty) {
        if (control.valid) {
          this.preview = {...f.value, date: new Date()};
        } else {
          this.preview = null;
          // possible error messages for this form field
          const msgs = this.validationMessages[field];
          // append all the errors for this form field
          Object.keys(control.errors).forEach(errKey => {
            this.formErrors[field] += msgs[errKey] + ' ';
          });
        }
      }
    });
  }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    const id = +this.route.params
      .switchMap((params: Params) => this.dishService.getDish(+params['id']))
      .subscribe(d => {
        this.dish = d;
        this.dishcopy = d;
        this.setPrevNext(d.id);
      },
      errMsg => this.errMsg = errMsg
    );
  }

  setPrevNext(dishId: number) {
    const dishIndex = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + dishIndex - 1) % this.dishIds.length];
    this.next = this.dishIds[(dishIndex + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.dishcopy.comments.push({...this.preview});
    this.dishcopy.save()
      // confirms save occurred successfully, so put that in the real dish
      .subscribe(dish => this.dish = dish);
    this.preview = null;
    this.commentForm.markAsPristine();
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
    });
  }

}
