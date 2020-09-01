import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './models/category.model'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {  }

  categoryDataUrl = 'http://192.168.67.245:3000/category';
  individualCategoryDataUrl = 'http://192.168.67.245:3000/category?category_id=eq.'


  getCategoryData() {
    return this.http.get<any[]>(this.categoryDataUrl)
  }

  postCategory(newCategory) {
    return this.http.post<Category>(this.categoryDataUrl, newCategory)
  }

  updateCategory(id: number, updatedCategory: Category) {
    return this.http.patch<Category>(`${this.categoryDataUrl}${id}`, updatedCategory)
  }

  deleteCategory(id: number) {
    return this.http.delete<Category>(`${this.individualCategoryDataUrl}${id}`)
  }
}
