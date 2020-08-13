import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../cities.service';
import { City } from '../models/city.model';
import { CountryService } from '../country.service'
import { Country } from '../models/country.model';

import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {


  countries: Country[];
  selectedCity: City = null;
  cities: City[];

  constructor(private citiesService: CitiesService, private countryService: CountryService, private fb: FormBuilder) { }

  // cityForm = new FormGroup({
  //   city_id: new FormControl(),
  //   city: new FormControl(),
  //   country_id: new FormControl(),
  //   last_update: new FormControl(),
  //   country: new FormControl()
  //   })

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
        console.log(data);
        this.cities = data;
      })
    }

    onSelect(city: City) {
      this.selectedCity = city;
      console.log(city)
      this.updateValue()
    }

    updateValue() {
      this.cityForm.patchValue({
        city: this.selectedCity.city,
        country_id: this.selectedCity.city_id,
        last_update: this.selectedCity.last_update,
      })
    }

    resetForm() {
      this.selectedCity = null;
      this.getAllCities()
    }

    deleteOnClick() {
      this.citiesService.deleteCity(this.selectedCity.city_id).subscribe(
        res => {
          console.log(res)
          this.getAllCities()
        }
      );
      this.cityForm.reset()
    }
    saveCityOnSubmit() {
      return

      }

// country data

getAllCountries() {
  // console.log(this.selectedCountry)
  this.countryService.getCountryData().subscribe(data => {
    console.log(data)
    this.countries = data;
  })
}

get country_id() {
  return this.cityForm.get('country_id');
}

changeCountry(e) {
     this.country_id.setValue(e.target.value, {
      onlySelf: true
    })
     console.log(e.target.value)
 }

      // scroll to top on country selected
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
