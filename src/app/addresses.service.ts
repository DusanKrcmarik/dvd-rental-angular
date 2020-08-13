import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Address } from '../app/models/address.model'

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

addressDataUrl = 'http://192.168.67.245:3000/address?select=*,city(city,city_id)&city_id=eq.'
  
constructor(private http: HttpClient) { }

getAddressByCityId(id:number) {
  return this.http.get<Address[]>(`${this.addressDataUrl}${id}`)
  .pipe(
    retry(3), 
    catchError(this.handleError) 
  );
}
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {

    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
    }

  return throwError(
    'Something bad happened; please try again later.');
}
}
