import { Language } from "./language.model";

export class Film {
    film_id: number;
    title: string;
    description: string;
    release_year: number;
    language_id: Language; 
    rental_duration: number;
    rental_rate: number;
    length: number;
    replacement_cost: 22.99;
    rating: string;
    last_update: any;
    special_features: [];
    fulltext: string;
}