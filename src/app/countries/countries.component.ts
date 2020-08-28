import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from '../models/country.model'
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment'




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

  constructor(private countryService: CountryService) {
    // let date = new Date();
    // console.log('test date:', moment(date).format('YYYY-MM-DD'));
   }

  countryForm = new FormGroup({
    country_id: new FormControl(),
    country: new FormControl(),
    last_update: new FormControl()
  })
  
  ngOnInit(): void {
    // console.log(this.selectedCountry)
    this.getAllCountries()
  }
  
  getAllCountries() {
    // console.log(this.selectedCountry)
    this.countryService.getCountryData().subscribe(data => { 
      this.countries = data;
      // if(this.countries){
      //   console.log('ucitalo se milo')
      //   let formatedDateEntries = this.countries.map(c =>moment(c.last_update).format('YYYY-MM-DD'))
      // }
      
    })
  }

  onSelect(country: Country) { 
    this.selectedCountry = country; 
    if(this.selectedCountry.last_update) {
      this.selectedCountry.last_update = moment(this.selectedCountry.last_update).format('YYYY-MM-DD')
    }
    console.log('OnSelect' ,country, 'Last_update',this.selectedCountry.last_update)
    this.updateValue()
  }

  updateValue() {
    // this.countryForm.controls.country.setValue(this.selectedCountry.country);
    this.countryForm.patchValue({
      country: this.selectedCountry.country,
      country_id: this.selectedCountry.country_id,
      last_update: this.selectedCountry.last_update,
      // now.format("yyyy-MM-dd")
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
        console.log('Deleted item ',res)
        this.getAllCountries()
      }
    );
    this.countryForm.reset()
  }


  saveCountryOnSubmit() {

    if (this.selectedCountry) {
      const updatedCountry = {
        "country": this.countryForm.controls['country'].value,
        "last_update": this.countryForm.controls['last_update'].value
      }
      console.log('datica datica dva' , updatedCountry);

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
