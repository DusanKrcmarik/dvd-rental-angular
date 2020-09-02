import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './home-view/home-view.component';
import { CountriesComponent } from './countries/countries.component';
import { CitiesComponent } from './cities/cities.component';
import { FilmsComponent } from './films/films.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: 'home', component: HomeViewComponent },
  { path: 'countries', component: CountriesComponent }, 
  { path: 'cities', component: CitiesComponent }, 
  { path: 'films', component: FilmsComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
