import { City } from "./city.model";

export class Address {
    address_id: number;
    address: string;
    address2: string;
    district: string;
    city_id: number;
    postal_code: number;
    phone: number;
    last_update: Date;
    city: City
}
