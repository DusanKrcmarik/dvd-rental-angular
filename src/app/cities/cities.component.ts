import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../cities.service';
import { City } from '../models/city.model';
import { CountryService } from '../country.service'
import { Country } from '../models/country.model';

import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';



@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  dropdownSelectedCountry: any;
  selectedCountry: Country;
  newCity: FormBuilder
  updatedCity: FormBuilder
  selectedCity: City = null;
  countries: Country[];
  cities: City[];

  constructor(private citiesService: CitiesService, private countryService: CountryService, private fb: FormBuilder) { }

  cityForm = this.fb.group({
    city_id: [''],
    city: [''],
    country_id: [''],
    last_update: [''],
  })


  ngOnInit(): void {
    this.getAllCities()
    this.getAllCountries()
  }

    getAllCities() {
      this.citiesService.getCityData().subscribe(data => {
        this.cities = data;
      })
    }

    onSelect(city: City) {
      this.selectedCity = city;
      console.log('ss' , this.selectedCity);
      this.selectedCountry = city.country_id;
      this.dropdownSelectedCountry = this.selectedCountry;

      if(this.selectedCity.last_update) {
        this.selectedCity.last_update = moment(this.selectedCity.last_update).format('YYYY-MM-DD')
      }
      // console.log(this.dropdownSelectedCountry);
      // console.log(city)
      this.updateValue()
      // console.log(this.selectedCountry.country)
    }

    updateValue() {
    this.selectedCountry = this.selectedCity.country_id;
      this.cityForm.patchValue({
        city_id: this.selectedCity.city_id,
        city: this.selectedCity.city,
        country_id: this.selectedCountry.country,
        last_update: this.selectedCity.last_update,
      })
      // console.log(this.selectedCity.country_id.country);

    }

    resetForm() {
      this.selectedCity = null;
      this.selectedCountry = null;
      this.getAllCities()
    }

    deleteCityOnClick() {
      this.citiesService.deleteCity(this.selectedCity.city_id).subscribe(
        res => {
          this.getAllCities();
          console.log(res)
        }
      );
      this.cityForm.reset()
      // this.getAllCities()
    }
    saveCityOnSubmit() {
      if (this.selectedCity) {
        const updatedCity = {
          "city": this.cityForm.controls['city'].value,
          "country_id": this.cityForm.controls['country_id'].value.country_id,
          "last_update": this.cityForm.controls['last_update'].value,
        }
        console.log(updatedCity);

        this.citiesService.updateCity(this.selectedCity.city_id, updatedCity).subscribe(
          res => {
            console.log(res)
            this.getAllCities()
          }
        )
      } else {
        const newCity = {
          "city": this.cityForm.controls['city'].value,
          "country_id": this.cityForm.controls['country_id'].value.country_id,
        }
        this.getAllCities()
        this.citiesService.postCity(newCity).subscribe(
          res => {
            console.log(res);
            this.getAllCities();
          }
        )
        this.cityForm.reset()
      }
    }
// country data

getAllCountries() {
  // console.log(this.selectedCountry)
  this.countryService.getCountryData().subscribe(data => {
    this.countries = data;
    console.log(this.countries);
  })
}

// updateCountryOfCity(country) {
//      this.cityForm.patchValue({
//       // country_id: e.target.value
//      })
//      console.log(country)
//  }

      // scroll to top on city selected
      scroll(el: HTMLElement) {
        el.scrollIntoView();
      }

}