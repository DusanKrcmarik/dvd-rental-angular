import { Country } from "./country.model";

export class City {
    city_id?: number;
    city: string;
    country_id?: Country;
    last_update?: any;
    country?: Country;
}
