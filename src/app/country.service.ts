import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry,} from 'rxjs/operators' 
import { throwError, Observable,} from 'rxjs';
import { Country } from './models/country.model';

@Injectable({
  providedIn: 'root'
})

export class CountryService {
  // countryDataUrl = 'http://192.168.67.245:3000/country?limit=20&offset=10';
  countryDataUrl = 'http://192.168.67.245:3000/country?order=country_id.asc';
  individualCountryDataUrl = 'http://192.168.67.245:3000/country?country_id=eq.';

  constructor(private http: HttpClient) { }

  getCountryData() {
    return this.http.get<any[]>(this.countryDataUrl).pipe(
      retry(3),
    )
  }

  postCountry(newCountry:Country) {
    return this.http.post<Country>(this.countryDataUrl, newCountry);
 }

  updateCountry(id: number, updatedCountry: Country) {
   return this.http.patch<Country>(`${this.individualCountryDataUrl}${id}`, updatedCountry)
 }

  deleteCountry(id: number) {
   return this.http.delete<Country>(`${this.individualCountryDataUrl}${id}`)
 }

}


