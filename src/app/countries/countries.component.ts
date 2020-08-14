import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from '../models/country.model'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  providers: [CountryService],
  styleUrls: ['./countries.component.scss']
})



export class CountriesComponent implements OnInit {

  newCountry: FormGroup;
  updatedCountry: FormGroup;
  countries: Country[];
  selectedCountry: Country = null;

  constructor(private countryService: CountryService) { }

  countryForm = new FormGroup({
    country_id: new FormControl(),
    country: new FormControl(),
    last_update: new FormControl()
  })
  
  ngOnInit(): void {
    console.log(this.selectedCountry)
    this.getAllCountries()
  }

  getAllCountries() {
    console.log(this.selectedCountry)
    this.countryService.getCountryData().subscribe(data => {
      console.log(data)
      this.countries = data;
    })
  }

  onSelect(country: Country) {
    this.selectedCountry = country;
    console.log(country)
    this.updateValue()
  }

  updateValue() {
    // this.countryForm.controls.country.setValue(this.selectedCountry.country);
    this.countryForm.patchValue({
      country: this.selectedCountry.country,
      country_id: this.selectedCountry.country_id,
      last_update: this.selectedCountry.last_update,
    })
  }

  resetForm() {
    console.log('1', this.selectedCountry)
    this.selectedCountry = null;
    console.log('2', this.selectedCountry)
    this.getAllCountries()
  }

  deleteOnClick() {
    this.countryService.deleteCountry(this.selectedCountry.country_id).subscribe(
      res => {
        console.log(res)
        this.getAllCountries()
      }
    );
    this.countryForm.reset()
  }


  saveCountryOnSubmit() {
    if (this.selectedCountry) {
      const updatedCountry = {
        "country": this.countryForm.controls['country'].value
      }
      this.countryService.updateCountry(this.selectedCountry.country_id, updatedCountry).subscribe(
        res => {
          console.log(res)
          this.getAllCountries()
        }
      )
    } else {
      const newCountry = {
        "country": this.countryForm.controls['country'].value
      }
      this.getAllCountries()
      console.log(newCountry)
      this.countryService.postCountry(newCountry).subscribe(
        res => {
          console.log(res);
          this.getAllCountries();
        }
      );
    }

  }

  // scroll to top on country selected
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}