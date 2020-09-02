import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../models/category.model'

import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  categories: Category[];


  constructor(private categoryService: CategoriesService, private fb: FormBuilder) { }

  categoryForm = this.fb.group({
    category_id: [''],
    name: [''],
    last_update: ['']
  })

  ngOnInit(): void {
    this.getAllCategories();
    
  }

// http service methods

getAllCategories() {
  this.categoryService.getCategoryData().subscribe(data => {
    this.categories = data;
    console.log(data)
  }) 
}
}
