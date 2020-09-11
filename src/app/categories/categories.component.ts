import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../models/category.model'

import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {



  // pagination & search data
  config: any;
  category: any = '';
  // pagination  & search data

  categories: Category[];
  selectedCategory: Category = null;
  newCategory: FormGroup;
  updatedCategory: FormGroup;

  constructor(private categoryService: CategoriesService, private fb: FormBuilder) {

    //pagination config
    this.config = {
      itemsPerPage: 7,
      currentPage: 1,
      // totalItems: this.categories
    };

  }

  //form config
  categoryForm = this.fb.group({
    category_id: [''],
    name: [''],
    last_update: ['']
  })

  ngOnInit(): void {
    this.getAllCategories();
  }


getAllCategories() {
  this.categoryService.getCategoryData().subscribe(data => {
    this.categories = data;
  })
}


// updating data methods

saveCategoryOnSubmit() {
  if (this.selectedCategory) {
    const updatedCategory = {
      "name": this.categoryForm.controls['name'].value,
      "last_update": this.categoryForm.controls['last_update'].value
    }
    console.log('updated data', updatedCategory)
    this.categoryService.updateCategory(this.selectedCategory.category_id, updatedCategory).subscribe(
      () => {
        this.getAllCategories()
      }
    )
  } else {
    const newCategory = {
      "name": this.categoryForm.controls['name'].value
    }
    console.log('new data', newCategory)
    this.categoryService.postCategory(newCategory).subscribe( () => {
      this.getAllCategories()
    })
  }
}

deleteCategoryOnClick() {
  this.categoryService.deleteCategory(this.selectedCategory.category_id).subscribe(
     () => {
  }),
  error => {
    console.log(error)
  },
  this.resetForm()
  this.getAllCategories()
}

// template methods

onSelect(category: Category) {
  this.selectedCategory = category;
  if (this.selectedCategory.last_update) {
    this.selectedCategory.last_update = moment(this.selectedCategory.last_update).format('YYYY-MM-DD')
  }
  this.updateValue()
  console.log('kategorije',this.categories )
}

updateValue() {
  this.categoryForm.patchValue({
    category_id: this.selectedCategory.category_id,
    name: this.selectedCategory.name,
    last_update: this.selectedCategory.last_update,
})
}

resetForm(value: any = undefined): void {
  this.categoryForm.reset(value);
  (this as unknown as{submitted: boolean}).submitted = false;
  this.selectedCategory = null
  this.getAllCategories()
}

// pagination config update
pageChanged(event){
  this.config.currentPage = event;
}

  // scroll to top on country selected
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
