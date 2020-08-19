import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import { AddressesComponent } from './addresses/addresses.component';
import { CountriesComponent } from './countries/countries.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { HeaderComponent } from './header/header.component';
import { CityDetailComponent } from './cities/city-detail/city-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FilmsComponent } from './films/films.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular material

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';






@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    AddressesComponent,
    CountriesComponent,
    HomeViewComponent,
    HeaderComponent,
    CityDetailComponent,
    PageNotFoundComponent,
    FilmsComponent,
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
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
