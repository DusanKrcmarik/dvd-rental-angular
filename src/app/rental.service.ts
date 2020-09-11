import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './models/customer.model';
import { Rental } from './models/rental.model';
import { APP_URL } from './config/app-url';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http: HttpClient) { }

  //customer api endpoints
  customerData = `${APP_URL}/customer`;
  individualCustomerData = `${APP_URL}/customer?customer_id=eq.`

  //rental api endpoints
  rentalData = `${APP_URL}/rental?limit=100`;
  fullRentalData = `${APP_URL}/rental?select=*,customer(customer_id,first_name,last_name,email)&limit=100&order=rental_id.desc`
  individualRentalData = `${APP_URL}/rental?rental_id=eq.`


  //customer requests
  getCustomerData() {
    return this.http.get<Customer[]>(this.customerData)
  }

  //rental requests

  getRentalData() {
    return this.http.get<Rental[]>(this.rentalData)
  }

  getFullRentalData() {
    return this.http.get<Rental[]>(this.fullRentalData)
  }

  postRental(newRental: Rental) {
    return this.http.post<Rental>(this.fullRentalData, newRental)
  }

  updateRental(id: number, updatedRental: Rental) {
    return this.http.patch<Rental>(`${this.individualRentalData}${id}`, updatedRental)
  }

  deleteRental(id: number) {
    return this.http.delete<Rental>(`${this.individualRentalData}${id}`)
  }
}
