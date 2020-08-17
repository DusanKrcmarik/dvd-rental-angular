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

  dropdownSelectedCountry:any;
  selectedCountry:Country;
  newCity: FormBuilder
  updatedCity: FormBuilder
  selectedCity: City = null;
  countries: Country[];
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
        console.log(data)
        this.cities = data;
      })
    }

    onSelect(city: City) {
      this.selectedCity = city;
      console.log(city.country_id);
      this.selectedCountry = city.country_id;
      this.dropdownSelectedCountry = this.selectedCountry;
      console.log(this.dropdownSelectedCountry);
      // console.log(city)
      this.updateValue()
    }

    updateValue() {

    this.selectedCountry = this.selectedCity.country_id;
      this.cityForm.patchValue({
        city_id: this.selectedCity.city_id,
        city: this.selectedCity.city,
        last_update: this.selectedCity.last_update,
        country_id: this.selectedCountry.country
      })
      // console.log(this.selectedCity.country_id.country);

    }

    resetForm() {
      this.selectedCity = null;
      this.getAllCities()
    }

    deleteCityOnClick() {
      console.log(this.selectedCity.city_id)
      this.citiesService.deleteCity(this.selectedCity.city_id).subscribe(
        res => {
          console.log(res)
          this.getAllCities()
        }
      );
      this.cityForm.reset()
    }
    saveCityOnSubmit() {
      // console.log(this.cityForm.controls['city'].value);
      console.log(this.cityForm.controls['country_id'].value.country_id);

      // this.countries.forEach(c => {
      //   if(c.country === this.cityForm.controls['country_id'].value) {
      //     console.log(c.country_id);
      //   }
      // })

      if (this.selectedCity) {
        const updatedCity = {
          "city": this.cityForm.controls['city'].value,
          "country_id": this.cityForm.controls['country_id'].value.country_id
          // "country_id": this.cityForm.controls['']
        }
        console.log(updatedCity);
        return
        this.citiesService.updateCity(this.selectedCity.city_id, updatedCity).subscribe(
          res => {
            console.log(res)
            this.getAllCities()
          }
        )
      } else {
        return
        const newCity = {
          "city": this.cityForm.controls['city'].value
        }
        this.getAllCities()
        this.citiesService.postCity(newCity).subscribe(
          res => {
            console.log(res);
            this.getAllCountries();
          }
        )
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

      // scroll to top on country selected
      scroll(el: HTMLElement) {
        el.scrollIntoView();
      }

}

