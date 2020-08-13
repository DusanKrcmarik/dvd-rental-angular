import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { City } from '../app/models/city.model'

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  fullCityData = 'http://192.168.67.245:3000/city?select=*,country_id(country_id,country,last_update)'
  individualCityDataUrl = 'http://192.168.67.245:3000/city?city_id=eq.'
  
  constructor(private http: HttpClient) { }

  getCityData() {
    return this.http.get<City[]>(this.fullCityData).pipe(
      retry(3), 
    );
  }

  postCity(newCity: City) {
    return this.http.post<City>(this.fullCityData, newCity)
  }

  updateCity(id: number, updatedCity: City) {
    return this.http.patch<City>(`${this.individualCityDataUrl}${id}`, updatedCity)
  }

  deleteCity(id: number) {
    return this.http.delete<City>(`${this.individualCityDataUrl}${id}`)
  }
  }
