import { Component, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { Customer } from '../models/customer.model';
import { Rental } from '../models/rental.model';


import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import * as moment from 'moment';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss']
})
export class RentalComponent implements OnInit {

  //form references
  customerForm: FormGroup;
  rentalForm: FormGroup;

  //template references
  customers: Customer[];
  selectedCustomer: Customer = null;

  rentals: Rental[];
  selectedRental: Rental = null;
  updatedRental: FormGroup

  constructor(private fb: FormBuilder, private rentalService: RentalService) { }

  ngOnInit(): void {

    console.log(this.customerForm)
    this.getCustomers()
    this.getRentals()

  //forms
  this.customerForm = this.fb.group({
    customer_id: ['', Validators.required],
    store_id: [''],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    address_id: [''],
    activebool: [''],
    create_date: [''],
    last_update: [''],
    active: ['']
  })

  this.rentalForm = this.fb.group({
    rental_id: ['', Validators.required],
    rental_date: ['', Validators.required],
    inventory_id: [''],
    customer_id: ['', Validators.required],
    return_date: ['', Validators.required],
    staff_id: [''],
    last_update: ['']
  })


  }

  // form patch values diosajkdoisd
  updateValue() {
    this.selectedCustomer = this.selectedRental.customer
    this.rentalForm.patchValue({
      rental_id: this.selectedRental.rental_id,
      rental_date: this.selectedRental.rental_date,
      customer_id: `${this.selectedCustomer.first_name} ${this.selectedCustomer.last_name}`,
      return_date: this.selectedRental.return_date,
      last_update: this.selectedRental.last_update,
      staff_id: this.selectedRental.staff_id,
      inventory_id: this.selectedRental.inventory_id,
    })
  }

  onSelect(rental: Rental) {
    this.selectedRental = rental;
    console.log(this.selectedRental);
    this.selectedCustomer = rental.customer
    console.log(this.selectedCustomer)

    if (this.selectedRental.rental_date || this.selectedRental.return_date) {
      this.selectedRental.rental_date = moment(this.selectedRental.rental_date).format('YYYY-MM-DD');
      this.selectedRental.return_date = moment(this.selectedRental.return_date).format('YYYY-MM-DD')
    }
    this.updateValue()
  }



  //service methods
  getCustomers() {
    this.rentalService.getCustomerData().subscribe((data) => {
      this.customers = data;
      // console.log(this.customers)
    })
  }

  getRentals() {
    this.rentalService.getFullRentalData().subscribe((data) => {
      this.rentals = data;
      console.log('rentals come with customer_id object, probably' , this.rentals);
    })
  }
  

  saveRentalOnSubmit() { 
    if(this.rentalForm){
      this.rentalForm.value.customer_id = this.rentalForm.value.customer_id.customer_id;
    } 
    if (this.selectedRental) {
      // const updatedRental= '';
      console.log('VALUES FROM FORM WHICH I SEND TO BACKEND - VALUES FROM INPUT' , this.rentalForm.value)
      console.log('ALL MY FORMS' , this.rentalForm)
      this.rentalService.updateRental(this.selectedRental.rental_id,  this.rentalForm.value).subscribe(
        res => {
          console.log(res)
          this.getRentals()
        }
      )
    } else {
      this.rentalService.postRental(this.rentalForm.value).subscribe(
        res => {
          console.log(res);
          this.getRentals();
        }
      )
      this.rentalForm.reset()
    }
  }

  deleteRentalOnClick() {
    console.log(this.selectedRental.rental_id)
    this.rentalService.deleteRental(this.selectedRental.rental_id).subscribe(() => {
    })
    this.resetForm()
  }



  // form methods
  resetForm() {
    this.selectedRental = null;
    this.selectedCustomer = null;
    this.getRentals()
    this.getCustomers()
  }


  // scroll to top on rental selected
  scroll(el: HTMLElement) {
  el.scrollIntoView();
  }
}
