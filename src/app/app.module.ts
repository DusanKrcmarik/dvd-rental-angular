// modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';


// components
import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import { AddressesComponent } from './addresses/addresses.component';
import { CountriesComponent } from './countries/countries.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FilmsComponent } from './films/films.component';
import { FilmsDetailComponent } from './films/films-detail/films-detail.component';
import { FilmInsertComponent } from './films/film-insert/film-insert.component';
import { CategoriesComponent } from './categories/categories.component';



// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// custom pipes

import { SearchPipe } from './pipes/search.pipe'




@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    AddressesComponent,
    CountriesComponent,
    HomeViewComponent,
    HeaderComponent,
    PageNotFoundComponent,
    FilmsComponent,
    FilmsDetailComponent,
    FilmInsertComponent,
    CategoriesComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[FilmsDetailComponent]
})
export class AppModule { }
