import { Customer } from './customer.model'

export class Rental {
        rental_id: number;
        rental_date: any;
        inventory_id?: any;
        customer_id: Customer;
        return_date: any;
        staff_id?: number;
        last_update?: any
        customer: Customer;
}